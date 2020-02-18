import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { VitalSign } from 'src/app/interfaces/daily-records';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.page.html',
  styleUrls: ['./signos.page.scss'],
})
export class SignosPage implements OnInit {
  paciente;

  togglePresion = false;
  toggleFrecuencia = false;
  toggleSaturacion = false;
  toggleGlucosa = false;

  presionA;
  presionB;
  latidos;
  oxigeno;
  glucosa;

  today;

  info = [];

  constructor(private modalCtrl: ModalController,
    private dailyService: DailyRecordService,
    private router: Router) { }

  ngOnInit() {
    this.paciente = history.state.data;
    this.today = new Date().toISOString();
  }

  salirSinArgumentos() {
    this.router.navigateByUrl('/nursery/tab3')
  }
  salirConArgumentos() {
    if (this.togglePresion === true) this.getPresionValues();
    if (this.toggleFrecuencia === true) this.getFrecuenciaValues();
    if (this.toggleGlucosa === true) this.getGlucosaValues();
    if (this.toggleSaturacion === true) this.getSaturacionValues();

    this.dailyService
      .putVitalDailyRecords(this.paciente._id, this.info)
      .subscribe(
        res => {
          // SweetAlert
          if(res.success === true) {
            this.disparaAlert("Signos vitales actualizados")
            this.router.navigateByUrl('/nursery/tab3')
          }
        },
        err => {
          console.log("error", err);
        }
      );
  }
  /* 
    Método que prepara los datos de Presion Arterial para 
    posteriormente agregarlos al arreglo de información.
  */
  getPresionValues() {
    let data: VitalSign = {
      vitalSign: "Presion arterial",
      date: this.today,
      value: this.presionA,
      valueB: this.presionB
    };
    this.info.push(data);
  }
  /* 
    Método que prepara los datos de Frecuencia cardiaca para 
    posteriormente agregarlos al arreglo de información.
  */
  getFrecuenciaValues() {
    let data: VitalSign = {
      vitalSign: "Frecuencia cardiaca",
      date: this.today,
      value: this.latidos
    };
    this.info.push(data);
  }
  /* 
    Método que prepara los datos de saturación para posteriormente
    agregarlos al arreglo de información.
  */
  getSaturacionValues() {
    let data: VitalSign = {
      vitalSign: "Saturacion de oxigeno",
      date: this.today,
      value: this.oxigeno
    };
    this.info.push(data);
  }
  /* 
    Método que prepara los datos de glucosa para posteriormente
    agregarlos al arreglo de información.
  */
  getGlucosaValues() {
    let data: VitalSign = {
      vitalSign: "Glucosa",
      date: this.today,
      value: this.glucosa
    };
    this.info.push(data);
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
    });
  }

}
