import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Activity } from 'src/app/interfaces/daily-records';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-actividades',
  templateUrl: './page-actividades.page.html',
  styleUrls: ['./page-actividades.page.scss'],
})
export class PageActividadesPage implements OnInit {
  paciente;

  atencion = [];
  calculo = [];
  estimulacion = [];
  lenguaje = [];
  memoria = [];
  reminiscencia = [];

  variable: Activity;

  emptyDailyRecords = false;

  toggleUbicacion = false;
  toggleFecha = false;
  observation;

  constructor( private dailyService: DailyRecordService,
               private storage: Storage,
               private location: Location ) { }

  ngOnInit() {
    this.paciente = history.state.data;
    this.storage.get("Rol").then(val => {
      this.getDailyProgramPhase(val);
    });
  }

  getDailyProgramPhase(phase: string) {
    this.dailyService.getDailyProgramPhase(phase).subscribe(res => {
      if (res.cuantos === 0) {
        this.emptyDailyRecords = true;
      } else {
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
      }
    });
  }
  EnviarDatos() {
    let array = [];
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
        }
      });
    }

    let data = {
      orientation: this.toggleUbicacion,
      date: this.toggleFecha,
      observation: this.observation,
      activities: array
    };


    this.dailyService.putDailyRecordActivities(this.paciente._id, data).subscribe(res => {
      this.disparaAlert("Actualizado con éxito");

    }, err => {
      console.log(err);
    }
    );
    this.location.back();
    
  }


  salirSinArgumentos() {
    this.location.back();
  }

  disparaAlert(title: string) {
    // SweetAlert
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: "success",
      title
    });
  }
}
