import { Component, OnInit, ViewChild } from "@angular/core";
import { PatientsService } from "src/app/services/patients.service";
import { AlertController, IonSegment } from "@ionic/angular";
import { DailyRecordService } from "src/app/services/daily-record.service";
import Swal from "sweetalert2";
import { element } from "protractor";
import { Patient } from "../../../interfaces/caregiver";

@Component({
  selector: "app-tab2",
  templateUrl: "./tab-asistencia.page.html",
  styleUrls: ["./tab-asistencia.page.scss"],
})
export class TabAsistenciaPage implements OnInit {
  @ViewChild("iSegmentRegistros", { static: true })
  iSegmentRegistros: IonSegment;

  registro = "entrada";
  busqueda;
  fase = "inicial";

  // Pacientes de cada etapa
  inicialesEntrada = [];
  intermediosEntrada = [];
  avanzadosEntrada = [];

  inicialesSalida = [];
  intermediosSalida = [];
  avanzadosSalida = [];

  // Coincidencias de pacientes de cada etapa
  cinicialesEntrada = [];
  cintermediosEntrada = [];
  cavanzadosEntrada = [];

  cinicialesSalida = [];
  cintermediosSalida = [];
  cavanzadosSalida = [];

  date = new Date();
  today =
    this.date.getFullYear() +
    "-" +
    this.date.getMonth() +
    1 +
    "-" +
    this.date.getDate();

  constructor(
    private patientService: PatientsService,
    private alertCtrl: AlertController,
    private dailyService: DailyRecordService
  ) {}

  ngOnInit() {
    this.iSegmentRegistros.value = this.registro;

    this.patientService.getPatients().subscribe((resPatient) => {
      resPatient.patients.forEach((patients) => {
        if (patients.assistance === false) {
          switch (patients.phase) {
            case "Inicial":
              this.inicialesEntrada.push(patients);
              break;
            case "Intermedia":
              this.intermediosEntrada.push(patients);
              break;
            case "Avanzada":
              this.avanzadosEntrada.push(patients);
              break;
          }
        }
      });

      this.cinicialesEntrada = [...this.inicialesEntrada];
      this.cintermediosEntrada = [...this.intermediosEntrada];
      this.cavanzadosEntrada = [...this.avanzadosEntrada];
    });
  }

  /* 
    Método que obtiene los dailyRecords del día llamando al servicio de
    getDailyRecordsToday() y los guarda en el arreglo de pacientesSalida.
  */
  getDailyRecords() {
    // Se limpian los arreglos.
    this.inicialesSalida = [];
    this.intermediosSalida = [];
    this.avanzadosSalida = [];

    // Si registro es igual a salida, se agregan los pacientes a los
    // cuales se les agregó asistencia en el día actual, esto del servicio
    // de dailyRecordsDate.
    this.dailyService.getDailyRecordsToday().subscribe((res) => {
      res.drs.forEach((r) => {
        if (r.exit === false) {
          if (r.patient.phase === "Inicial") {
            this.inicialesSalida.push(r);
            return;
          } else if (r.patient.phase === "Intermedia") {
            this.intermediosSalida.push(r);
            return;
          } else {
            this.avanzadosSalida.push(r);
            return;
          }
        }
      });

      this.cinicialesSalida = [...this.inicialesSalida];
      this.cintermediosSalida = [...this.intermediosSalida];
      this.cavanzadosSalida = [...this.avanzadosSalida];
    });
  }

  /*
    Método que elimina de la lista de asistencia (InicialEntrada,
    IntermediosEntrada o AvanzadosEntrada según sea el caso) el paciente
    al cual se le registró una asistencia.
  */
  deleteOnAttendance(id) {
    if (this.fase === "inicial") {
      this.inicialesEntrada.forEach((element) => {
        if (element._id === id) {
          this.inicialesEntrada.splice(
            this.inicialesEntrada.indexOf(element),
            1
          );
          return;
        }
      });
    } else if (this.fase === "intermedia") {
      this.intermediosEntrada.forEach((element) => {
        if (element._id === id) {
          this.intermediosEntrada.splice(
            this.intermediosEntrada.indexOf(element),
            1
          );
          return;
        }
      });
    } else {
      this.avanzadosEntrada.forEach((element) => {
        if (element._id === id) {
          this.avanzadosEntrada.splice(
            this.avanzadosEntrada.indexOf(element),
            1
          );
          return;
        }
      });
    }
  }
  /*
    Método que elimina de la lista de salida (InicialEntrada,
    IntermediosEntrada o AvanzadosEntrada según sea el caso) el paciente
    al cual se le registró una salida.
  */
  deleteOnDeparture(data) {
    if (this.fase === "inicial") {
      this.inicialesSalida.forEach((element) => {
        if (data._id === element._id) {
          this.inicialesSalida.splice(this.inicialesSalida.indexOf(element), 1);
          return;
        }
      });
    } else if (this.fase === "intermedia") {
      this.intermediosSalida.forEach((element) => {
        if (data._id === element._id) {
          this.intermediosSalida.splice(
            this.intermediosSalida.indexOf(element),
            1
          );
          return;
        }
      });
    } else {
      this.avanzadosSalida.forEach((element) => {
        if (data._id === element._id) {
          this.avanzadosSalida.splice(this.avanzadosSalida.indexOf(element), 1);
          return;
        }
      });
    }
  }
  /* 
    Método que despliega el método attendanceAlert() en caso que
    se haya seleccionado la opción de Entrada, en caso de querer
    registrar una salida, se llama a departureAlert().
  */
  chooseAlert(data: string) {
    this.registro === "entrada"
      ? this.attendanceAlert(data)
      : this.departureAlert(data);
  }
  /* 
    Método que pedirá confirmación del usuario para registrar
    una asistencia a un paciente.
  */
  async attendanceAlert(id: string) {
    const alert = await this.alertCtrl.create({
      header: "Registro de entrada",
      message: "¿Está seguro de querer registrar esta entrada?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            return;
          },
        },
        {
          text: "Aceptar",
          handler: (blah) => {
            this.patientService.putPatientAssistance(id, true).subscribe();
            this.dailyService.postDailyRecords(id).subscribe();
            this.disparaAlert("Asistencia registrada");
            this.deleteOnAttendance(id);
          },
        },
      ],
    });
    await alert.present();
  }
  /* 
    Método que pedirá confirmación del usuario para registrar
    la salida de un paciente.
  */
  async departureAlert(data: any) {
    const alert = await this.alertCtrl.create({
      header: "Registro de Salida",
      message: "¿Está seguro de querer registrar esta salida?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            return;
          },
        },
        {
          text: "Aceptar",
          handler: () => {
            this.dailyService.putExitDailyRecords(data._id).subscribe();
            this.patientService
              .putPatientAssistance(data.patient._id, false)
              .subscribe();
            this.deleteOnDeparture(data);
            this.disparaAlert("Salida registrada");
          },
        },
      ],
    });
    await alert.present();
  }

  /* 
    Método que checa la opción seleccionada en el IonSegment de la entrada 
    y salida, lo iguala a registro.
  */
  segmentChangedRegistros(event) {
    this.registro = event.detail.value;

    if (this.registro === "salida") this.getDailyRecords();
  }

  /* 
    Método encargado de escuchar el segundo dato del arreglo proviniente
    del componente de searchbar ( el cual es la fase del paciente) y 
    llamar al método patientsRole.
  */
  eventListener(data: string) {
    this.busqueda = data[0];
    this.fase = data[1];

    this.busqueda = this.busqueda.toLowerCase();
    this.buscarCoincidencias();
  }

  buscarCoincidencias() {
    if (this.registro == "entrada") {
      // Pacientes de entrada
      switch (this.fase) {
        case "inicial":
          this.cinicialesEntrada = this.coincidenciasLista(this.inicialesEntrada);
          break;
        case "intermedia":
          this.cintermediosEntrada = this.coincidenciasLista(this.intermediosEntrada);
          break;
        case "avanzada":
          this.cavanzadosEntrada = this.coincidenciasLista(this.avanzadosEntrada);
          break;
      }
    } else {
      // Pacientes de salida
      switch (this.fase) {
        case "inicial":
          this.cinicialesSalida = this.coincidenciasLista(this.inicialesSalida);
          break;
        case "intermedia":
          this.cintermediosSalida = this.coincidenciasLista(this.intermediosSalida);
          break;
        case "avanzada":
          this.cavanzadosSalida = this.coincidenciasLista(this.avanzadosSalida);
          break;
      }
    }
  }

  coincidenciasLista(listaBase) {
    let listaCoincidencias = [...listaBase];

    if (this.busqueda.length > 0) {
      if (listaBase.length != 0) {
        listaCoincidencias = [];
        listaBase.forEach((elemento, indice) => {
          let paciente = elemento;
          if (paciente.patient != undefined) {
            paciente = paciente.patient;
          }
          let nombre: String =
            paciente.name +
            " " +
            paciente.lastName +
            " " +
            paciente.lastNameSecond;
          nombre = nombre.toLowerCase();

          if (nombre.includes(this.busqueda)) {
            listaCoincidencias.push(elemento);
          }
        });
      }
    }
    return listaCoincidencias;
  }

  disparaAlert(title: string) {
    // SweetAlert
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title,
    });
  }
}
