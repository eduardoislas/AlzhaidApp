import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { VitalSign } from 'src/app/interfaces/daily-records';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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

  mostrarAlerta(msg: String, icon: SweetAlertIcon) {
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
    });

    Toast.fire({
      icon: icon,
      title: msg
    });
  }

  numeroValido(valor): Boolean {
    if (valor == undefined) { // Si es undefined
      return false;
    } else { // Si no es undefined
      if (!isNaN(valor)) { //  Si es un numero
        if (valor == 0) {
          return false;
        } else {
          return true;
        }
      } else { // Si no es un numero
        return false;
      }
    }
  }

  salirSinArgumentos() {
    this.router.navigateByUrl('/nursery/tab-signos');
  }

  salirConArgumentos(): Boolean {
    if (this.togglePresion === true) {
      if (this.getPresionValues() == false) return false; // Para que no se guarde incompleto
    }
    if (this.toggleFrecuencia === true) {
      if (this.getFrecuenciaValues() == false) return false; // Para que no se guarde incompleto
    }
    if (this.toggleGlucosa === true) {
      if (this.getGlucosaValues() == false) return false; // Para que no se guarde incompleto
    }
    if (this.toggleSaturacion === true) {
      if (this.getSaturacionValues() == false) return false; // Para que no se guarde incompleto
    }

    if (!this.info.length) { //Si NO hubo registros... error
      this.mostrarAlerta('Todos los campos están vacíos', 'warning');
      return false;
    } else { // Si hubo registros se guardan
      this.dailyService
        .putVitalDailyRecords(this.paciente._id, this.info)
        .subscribe(
          res => {
            if (res.success === true) {
              this.mostrarAlerta('Signos vitales actualizados', 'success');
              this.router.navigateByUrl('/nursery/tab-signos');
            }
          },
          err => {
            console.log("error", err);
          }
        );
    }

    return true;
  }

  /* 
    Método que prepara los datos de Presion Arterial para 
    posteriormente agregarlos al arreglo de información.
  */
  getPresionValues(): Boolean {
    let data: VitalSign = {
      vitalSign: "Presion arterial",
      date: this.today,
      value: this.presionA,
      valueB: this.presionB
    };

    if (this.numeroValido(data.value) && this.numeroValido(data.valueB)) {
      this.info.push(data);
      return true;
    } else {
      this.mostrarAlerta('Presión arterial no válida', 'warning');
      return false;
    }
  }

  /* 
    Método que prepara los datos de Frecuencia cardiaca para 
    posteriormente agregarlos al arreglo de información.
  */
  getFrecuenciaValues(): Boolean {
    let data: VitalSign = {
      vitalSign: "Frecuencia cardiaca",
      date: this.today,
      value: this.latidos
    };

    if (this.numeroValido(data.value)) {
      this.info.push(data);
      return true;
    } else {
      this.mostrarAlerta('Frecuencia cardiaca no válida', 'warning');
      return false;
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

    if (this.numeroValido(data.value)) {
      this.info.push(data);
      return true;
    } else {
      this.mostrarAlerta('Saturación de oxígeno no válida', 'warning');
      return false;
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
    if (this.numeroValido(data.value)) {
      this.info.push(data);
      return true;
    } else {
      this.mostrarAlerta('Nivel de glucosa no válido', 'warning');
      return false;
    }
  }

  disparaAlert(title: string) {
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

