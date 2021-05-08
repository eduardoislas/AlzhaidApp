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
  selector: 'app-incidence-add',
  templateUrl: './incidence-add.page.html',
  styleUrls: ['./incidence-add.page.scss'],
})
export class IncidenceAddPage implements OnInit {

  tipo = '';
  area = '';
  tipoDeAviso = '';
  tglPrioridad = false;
  ExpirationDate = new Date().toString(); // --- NUEVO
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
  }

  ionViewWillEnter(){
    this.storage.get('username').then((val) => {
      this.user = val;
    });
  }

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

  /* Determina el id del paciente seleccionado */
  selecionarPaciente(event) {
    this.paciente = event.detail.value;
  }

  /*
    Envia a la base de datos la notificación
    */
  enviar() {
    let incidente;
    if (this.textDescripcion !== undefined &&
      this.tipoDeAviso !== '' && this.paciente !== undefined) {
      incidente = {
        description: this.textDescripcion,
        type: this.tipoDeAviso,
        user: this.user
      };

      this.patientService.putPatientIncidence(this.paciente,incidente).subscribe(res => {
        console.log(res);
        mostrarAlertaConfirmacion('Incidencia registrada');
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
