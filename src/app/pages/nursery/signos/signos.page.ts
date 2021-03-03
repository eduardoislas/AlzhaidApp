import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private dailyService: DailyRecordService,
    private router: Router) { }

  ngOnInit() {
    this.paciente = history.state.data;
    this.today = new Date().toISOString();
  }

  salirSinArgumentos() {
    this.router.navigateByUrl('/nursery/tab-signos')
  }
  salirConArgumentos() {
    if (this.togglePresion === true) this.getPresionValues();
    if (this.toggleFrecuencia === true) this.getFrecuenciaValues();
    if (this.toggleGlucosa === true) this.getGlucosaValues();
    if (this.toggleSaturacion === true) this.getSaturacionValues();

    if(!this.info.length){ //Si NO hubo registros... error
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
        icon: 'warning',
        title: 'Todos los campos están vacíos'
      })
    } else { // Si hubo registros se guardan
      this.dailyService
      .putVitalDailyRecords(this.paciente._id, this.info)
      .subscribe(
        res => {
          // SweetAlert
          if(res.success === true) {
            this.disparaAlert("Signos vitales actualizados");
            this.router.navigateByUrl('/nursery/tab-signos');
          }
        },
        err => {
          console.log("error", err);
        }
      );
    }
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

    if(data.value == undefined){ // Si se activaron los campos de presion arterial pero se dejaron vacíos
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
        icon: 'warning',
        title: 'Presión arterial no válida'
      })
    } else { // Si se activaron los campos de presion arterial y NO se dejaron vacíos
      this.info.push(data);
    }
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

    if(data.value == undefined){
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
        icon: 'warning',
        title: 'Frecuencia cardiaca no válida'
      })
    } else{
      this.info.push(data);
    }    
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

    if(data.value == undefined){
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
        icon: 'warning',
        title: 'Saturación de oxígeno no válida'
      })
    } else {
      this.info.push(data);
    }
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

    if(data.value == undefined){
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
        icon: 'warning',
        title: 'Nivel de glucosa no válido'
      })
    } else{
      this.info.push(data);
    }
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
