import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserListPage } from '../user-list/user-list.page';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { Storage } from '@ionic/storage';
import { NotificationsService } from 'src/app/services/notifications.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-notifications-add',
  templateUrl: './notifications-add.page.html',
  styleUrls: ['./notifications-add.page.scss'],
})
export class NotificationsAddPage implements OnInit {

  tipo = '';
  area = '';
  tipoDeAviso = '';
  tglPrioridad;
  ExpirationDate;
  textDescripcion;
  btnArea = [];
  paciente;
  pacientes = [];
  user: string;

  constructor(private modalCtrl: ModalController,
              private dailyService: DailyRecordService,
              private storage: Storage,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.patientsList();
    this.storage.get('username').then((val) => {
      this.user = val;
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: UserListPage,
      componentProps: {

      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
  }

  /*
    Método que obtiene a los pacientes en el dailyrecord
    Estos pacientes son guardados en el arreglo de pacientes.
  */
  patientsList() {
    // Se limpian los arreglos para agregar los de distintas fases
    this.pacientes = [];

    this.dailyService.getDailyRecordsToday().subscribe(res => {
      res.drs.forEach(r => {
        this.pacientes.push(r);
      });
    });
  }

  /*
    Determina el tipo de aviso de la notificación
  */
  tipoAviso( event ) {
    this.tipoDeAviso = event.detail.value;
    console.log(this.tipoDeAviso);
  }

  /*
    Escucha cuando se selecciona un area
  */
  listenerArea( event) {
    let del;
    console.log(event.detail.checked);

    if (event.detail.checked) {
      this.btnArea.push(event.detail.value);
    } else {
      del = this.btnArea.indexOf(event.detail.value);
      this.btnArea.splice(del, 1);
    }
    console.log(this.btnArea);
  }

  /* Determina el id del paciente seleccionado */
  selecionarPaciente(event) {
    this.paciente = event.detail.value;
  }

  /*
    Envia a la base de datos la notificación
    */
  enviar() {
    let notification;
    notification = {
      expiration_date: this.ExpirationDate,
      high_priority: this.tglPrioridad,
      description: this.textDescripcion,
      type: this.tipoDeAviso,
      area: this.btnArea,
      patient: this.paciente,
      user: this.user
    };

    console.log(notification);
    this.modalCtrl.dismiss();

    // Llamar el método del servicio
    this.notificationsService.postNotifications(notification)
    .subscribe(res => {
      this.disparaAlert('Notificacion registrada');
      this.modalCtrl.dismiss();
    });
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  /**
   * Muestra un mensaje de alerta con una confirmacion
   * @param title mensaje que mostrara la alerta
   */
  disparaAlert(title: string) {
    // SweetAlert
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'success',
      title
    });
  }
}
