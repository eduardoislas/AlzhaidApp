import { Component, OnInit } from "@angular/core";
import { PatientsService } from "../../../services/patients.service";
import { CaregiverService } from "../../../services/caregiver.service";
import { AlertController } from "@ionic/angular";
import { DailyRecordService } from "../../../services/daily-record.service";
import { RootDaily, Dr } from "../../../interfaces/daily-records";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab-registros",
  templateUrl: "./tab-registros.page.html",
  styleUrls: ["./tab-registros.page.scss"],
})
export class TabRegistrosPage implements OnInit {
  patients = [];
  selectedInfo = "general";
  fechaSeleccionada;
  fechaSeleccionadaISOString;
  pacienteSeleccionado;
  dailyRecordsPaciente: Dr[] = [];
  dailyRecordSeleccionado;
  fecha;
  horaEntrada;
  horaSalida;

  constructor(
    private patientService: PatientsService,
    private alertCtrl: AlertController,
    private dailyService: DailyRecordService,
    private caregiverService: CaregiverService,
    private storage: Storage,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarPacientes();


  }

  ngAfterViewInit() {
    this.dateChanged(new Date());
  }


  //METODO PARA ACTIVAR EL FAB DE NOTIFICACIONES, MOVER A UNA TAB MAS APROPIADA EN EL FUTURO
  async openComponent() {
    this.router.navigateByUrl(`notifications-add`,);
  }

  /*cargarPacientes() {
    let patientsArray = [];

    this.patientService.getPatients().subscribe(resPatient => {
      resPatient.patients.forEach(patient => {
        patientsArray.push(patient);
      });

      this.patients = patientsArray;
    });
  }*/

  cargarPacientes() {
    let userID;

    this.storage.get("id").then((res) => {
      userID = res;
      console.log(userID);
      let patientsArray = [];

      this.caregiverService
        .getCaregiverByUserID(userID)
        .subscribe((resCaregiver) => {
          patientsArray.push(resCaregiver.caregiver[0].patient);
          this.patients = patientsArray;
          this.pacienteSeleccionado = this.patients[0];
        });
    });
  }

  segmentChangedRegistros(event) {
    this.selectedInfo = event.detail.value;
  }

  dateChanged(event) {
    let fechaAux = new Date(Date.parse(event));
    let horasRestar = 1000 * 60 * 60 * 7;
    let nuevaFecha = fechaAux.getTime() - horasRestar;
    fechaAux = new Date(nuevaFecha);
    fechaAux.setUTCHours(0, 0, 0, 0);
    this.fechaSeleccionada = fechaAux;
    this.fechaSeleccionadaISOString = this.formatearFecha(
      fechaAux.toISOString()
    );
    console.log(this.fechaSeleccionada);

    this.buscarDailyRecord();
  }

  seleccionarPaciente(event) {
    this.pacienteSeleccionado = event;

    this.dailyService
      .getDailyRercodsPatient(this.pacienteSeleccionado._id)
      .subscribe((resDRs) => {
        let dailyRecords = (resDRs as RootDaily).drs;
        this.dailyRecordsPaciente = dailyRecords;
        this.buscarDailyRecord();
      });
  }

  buscarDailyRecord() {
    this.dailyRecordSeleccionado = undefined;

    if (
      this.dailyRecordsPaciente != undefined &&
      this.fechaSeleccionada != undefined
    ) {
      for (let i = 0; i < this.dailyRecordsPaciente.length; i++) {
        if (
          JSON.stringify(this.dailyRecordsPaciente[i].date) ==
          JSON.stringify(this.fechaSeleccionada)
        ) {
          this.dailyRecordSeleccionado = this.dailyRecordsPaciente[i];

          this.fecha =
            this.fechaSeleccionada.getUTCDay() +
            "/" +
            this.fechaSeleccionada.getUTCMonth() +
            "/" +
            this.fechaSeleccionada.getUTCFullYear();

          if (this.dailyRecordSeleccionado.enterHour != undefined) {
            this.horaEntrada = this.dailyRecordSeleccionado.enterHour.substring(
              11,
              16
            );
          }

          if (this.dailyRecordSeleccionado.exitHour != undefined) {
            this.horaSalida = this.dailyRecordSeleccionado.exitHour.substring(
              11,
              16
            );
          }
        }
      }
    }
  }

  formatearFecha(fechaSinFormatear: String) {
    let anio = fechaSinFormatear.substring(0, 4);
    let mes = fechaSinFormatear.substring(5, 7);
    let dia = fechaSinFormatear.substring(8, 10);

    return dia + "/" + mes + "/" + anio;
  }

  formatearHora(horaSinFormatear: String) {
    return horaSinFormatear.substring(11, 16);
  }
}
