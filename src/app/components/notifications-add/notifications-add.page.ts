import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { Storage } from '@ionic/storage';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Location } from '@angular/common';
import { PatientsService } from 'src/app/services/patients.service';
import { CaregiverService } from 'src/app/services/caregiver.service';
import { NotificationsListenerService } from 'src/app/services/notifications/notificationsListener.service';
import { mostrarAlertaConfirmacion, mostrarAlertaAdvertencia } from '../../helpers/alert-helper';

@Component({
  selector: 'app-notifications-add',
  templateUrl: './notifications-add.page.html',
  styleUrls: ['./notifications-add.page.scss'],
})
export class NotificationsAddPage implements OnInit {

  tipo = '';
  area = '';
  tipoDeAviso = '';
  tglPrioridad = false;
  ExpirationDate;
  textDescripcion;
  btnArea = [];
  paciente;
  pacientes = [];
  user: string;

  constructor(private modalCtrl: ModalController,
    private dailyService: DailyRecordService,
    private patientService: PatientsService,
    private caregiverService: CaregiverService,
    private storage: Storage,
    private notificationsService: NotificationsService,
    private router: Router,
    private localizacion: Location,
    private notificationsListenerService: NotificationsListenerService,
  ) { }

  ngOnInit() {
    this.patientsList();
    this.storage.get('username').then((val) => {
      this.user = val;
    });
  }

  /*
    Método que obtiene a los pacientes en el dailyrecord
    Estos pacientes son guardados en el arreglo de pacientes.
  */
  // patientsList() {
  //   // Se limpian los arreglos para agregar los de distintas fases
  //   this.pacientes = [];

  //   this.dailyService.getDailyRecordsToday().subscribe(res => {
  //     res.drs.forEach(r => {
  //       this.pacientes.push(r);
  //     });
  //   });
  // }

  /*
  Método que obtiene a todos los pacientes registrados
  Estos pacientes son guardados en el arreglo de pacientes.
  Si el usuario es de tipo familiar, solo se obtendran los pacientes 
  que esten ligados a ese usuario.
*/
  patientsList() {
    let rolUsuario;

    //Se obtiene el rol del usuario, para saber que pacientes se deben obtener
    this.storage.get("Rol").then((res) => {
      rolUsuario = res;
      console.log(rolUsuario);
      // Se limpian los arreglos para agregar los pacientes
      this.pacientes = [];

      if (rolUsuario === 'FAMILIAR') {//Si el rol del usuario es familiar, tiene acceso a su paciente vinculado
        let userID;

        this.storage.get("id").then((res) => {
          userID = res;
          console.log(userID);

          this.caregiverService.getCaregiverByUserID(userID).subscribe((resCaregiver) => {
            this.pacientes.push(resCaregiver.caregiver[0].patient);
          });
        });

      } else { //Si el rol del usuario es cualquiera que no sea familiar, tiene acceso a todos los pacientes
        this.patientService.getPatients().subscribe(resPatient => {
          resPatient.patients.forEach(patient => {
            this.pacientes.push(patient);
          });
        });
      }
    });
  }

  /*
    Determina el tipo de aviso de la notificación
  */
  tipoAviso(event) {
    this.tipoDeAviso = event.detail.value;
  }

  /*
    Escucha cuando se selecciona un area
  */
  listenerArea(event) {
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

  cambioPrioridad(event) {
    if (event.detail.value == 'Alta') this.tglPrioridad = true;
    else this.tglPrioridad = false;
  }

  /*
    Envia a la base de datos la notificación
    */
  enviar() {
    let notification;
    if (this.ExpirationDate !== undefined && this.textDescripcion !== undefined &&
      this.tipoDeAviso !== '' && this.btnArea !== undefined && this.paciente !== undefined) {
      notification = {
        expiration_date: this.ExpirationDate,
        priority: this.tglPrioridad,
        description: this.textDescripcion,
        type: this.tipoDeAviso,
        area: this.btnArea,
        patient: this.paciente,
        user: this.user
      };

      // Llamar el método del servicio
      this.notificationsService.postNotifications(notification)
        .subscribe(res => {
          mostrarAlertaConfirmacion('Notificacion registrada');
          this.notificationsListenerService.sendClickEvent();
          console.log(notification.priority);
        });

      this.salir();
    } else {
      mostrarAlertaAdvertencia('Faltan datos por rellenar');
    }
  }
  /**
   * Regresa a la pagina anterior
   */
  salir() {
    this.localizacion.back();
  }

}
