import { Component, OnInit, Input } from "@angular/core";
import { DailyRecordService } from "src/app/services/daily-record.service";
import { ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Activity } from "src/app/interfaces/daily-records";
import Swal from 'sweetalert2';

@Component({
  selector: "app-phase-modal-actividades",
  templateUrl: "./phase-modal-actividades.page.html",
  styleUrls: ["./phase-modal-actividades.page.scss"]
})
export class PhaseModalActividadesPage implements OnInit {
  @Input() paciente;

  atencion = [];
  calculo = [];
  estimulacion = [];
  lenguaje = [];
  memoria = [];
  reminiscencia = [];

  variable: Activity;

  toggleUbicacion = false;
  toggleFecha = false;
  observation;

  constructor(
    private dailyService: DailyRecordService,
    private modalCtrl: ModalController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get("Rol").then(val => {
      this.getDailyProgramPhase(val);
    });
    console.log(this.paciente);
  }

  getDailyProgramPhase(phase: string) {
    this.dailyService.getDailyProgramPhase(phase).subscribe(res => {
      // Attention
      res.dps.activities.attention.forEach(element => {
        for (let i of res.dps.activities.attention) {
          i["selected"] = false;
          i["score"] = 0;
        }
        this.atencion.push(element);
      });
      // Calculus
      res.dps.activities.calculus.forEach(element => {
        for (let i of res.dps.activities.calculus) {
          i["selected"] = false;
          i["score"] = 0;
        }
        this.calculo.push(element);
      });
      // Language
      res.dps.activities.language.forEach(element => {
        for (let i of res.dps.activities.language) {
          i["selected"] = false;
          i["score"] = 0;
        }
        this.lenguaje.push(element);
      });
      // Memory
      res.dps.activities.memory.forEach(element => {
        for (let i of res.dps.activities.memory) {
          i["selected"] = false;
          i["score"] = 0;
        }
        this.memoria.push(element);
      });
      // Reminiscence
      res.dps.activities.reminiscence.forEach(element => {
        for (let i of res.dps.activities.reminiscence) {
          i["selected"] = false;
          i["score"] = 0;
        }
        this.reminiscencia.push(element);
      });
      // Sensory
      res.dps.activities.sensory.forEach(element => {
        for (let i of res.dps.activities.sensory) {
          i["selected"] = false;
          i["score"] = 0;
        }
        this.estimulacion.push(element);
      });
    });
  }
  EnviarDatos() {
    let array = [];
    console.log("Fecha:", this.toggleFecha);
    console.log("Ubicacion:", this.toggleUbicacion);
    // Atención
    if (this.atencion.length > 0) {
      this.atencion.forEach(element => {
        if (element.selected === true) {
          let data = {
            name: element.name,
            classification: element.classification,
            performance: element.score
          };
          array.push(data);
          console.log(data);
        }
      });
    }
    // Cálculo
    if (this.calculo.length > 0) {
      this.calculo.forEach(element => {
        if (element.selected === true) {
          let data = {
            name: element.name,
            classification: element.classification,
            performance: element.score
          };
          array.push(data);
          console.log(data);
        }
      });
    }
    // Lenguaje
    if (this.lenguaje.length > 0) {
      this.lenguaje.forEach(element => {
        if (element.selected === true) {
          let data = {
            name: element.name,
            classification: element.classification,
            performance: element.score
          };
          array.push(data);
          console.log(data);
        }
      });
    }
    // Memoria
    if (this.memoria.length > 0) {
      this.memoria.forEach(element => {
        if (element.selected === true) {
          let data = {
            name: element.name,
            classification: element.classification,
            performance: element.score
          };
          array.push(data);
          console.log(data);
        }
      });
    }
    // Reminiscencia
    if (this.reminiscencia.length > 0) {
      this.reminiscencia.forEach(element => {
        if (element.selected === true) {
          let data = {
            name: element.name,
            classification: element.classification,
            performance: element.score
          };
          array.push(data);
          console.log(data);
        }
      });
    }
    // Estimulación
    if (this.estimulacion.length > 0) {
      this.estimulacion.forEach(element => {
        if (element.selected === true) {
          let data = {
            name: element.name,
            classification: element.classification,
            performance: element.score
          };
          array.push(data);
          console.log(data);
        }
      });
    }

    let data = {
      orientation: this.toggleUbicacion,
      date: this.toggleFecha,
      observation: this.observation,
      activities: array
    };

    console.log(data);

    this.dailyService
      .putDailyRecordActivities(this.paciente._id, data)
      .subscribe(
        res => {
          console.log(res);
          this.disparaAlert("Actualizado con éxito")
        },
        err => {
          console.log(err);
        }
      );

    this.modalCtrl.dismiss();
  }
  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  disparaAlert(title: string){
    // SweetAlert
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title
    })
  }
}
