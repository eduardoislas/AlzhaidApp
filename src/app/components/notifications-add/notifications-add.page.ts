import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { Storage } from '@ionic/storage';
import { NotificationsService } from 'src/app/services/notifications.service';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';



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
              private notificationsService: NotificationsService,
              private router: Router,
              private localizacion: Location) { }

  ngOnInit() {
    this.patientsList();
    this.storage.get('username').then((val) => {
      this.user = val;
    });
  }

  // async openModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: UserListPage,
  //     componentProps: {

  //     },
  //     backdropDismiss: false
  //   });
  //   await modal.present();

  //   const { data } = await modal.onDidDismiss();
  // }

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
  }

  /*
    Escucha cuando se selecciona un area
  */
  listenerArea( event) {
    let del;

    if (event.detail.checked) {
      this.btnArea.push(event.detail.value);
    } else {
      del = this.btnArea.indexOf(event.detail.value);
      this.btnArea.splice(del, 1);
    }
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
    console.log(this.ExpirationDate + ', ' + this.textDescripcion + ', '
              + this.tipoDeAviso + ', ' + this.btnArea + ', ' + this.paciente);
    if (this.ExpirationDate !== undefined && this.textDescripcion !== undefined &&
        this.tipoDeAviso !== '' &&  this.btnArea !== undefined  &&  this.paciente !== undefined ) {
      notification = {
        expiration_date: this.ExpirationDate,
        high_priority: this.tglPrioridad,
        description: this.textDescripcion,
        type: this.tipoDeAviso,
        area: this.btnArea,
        patient: this.paciente,
        user: this.user
      };

      // Llamar el método del servicio
      this.notificationsService.postNotifications(notification)
      .subscribe(res => {
        this.disparaAlert('Notificacion registrada');
      });

      this.salir();
    } else {
      Swal.fire('Faltan datos por rellenar');
    }
  }
  /**
   * Regresa a la pagina anterior
   */
  salir() {
    this.localizacion.back();
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
