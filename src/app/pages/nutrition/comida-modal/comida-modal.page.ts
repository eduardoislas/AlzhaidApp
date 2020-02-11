import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comida-modal',
  templateUrl: './comida-modal.page.html',
  styleUrls: ['./comida-modal.page.scss'],
})
export class ComidaModalPage implements OnInit {
  @Input() paciente;

  rangeIndependencia;
  rangeCubiertos;
  rangeDisfagia; 

  cantidadComida;
  tipoComida;


  constructor(private modalCtrl: ModalController,
              private dailyService: DailyRecordService) { }

  ngOnInit() {
  }

   /*
    Método que obtiene la calificación de independencia que haya sido
    asignada al paciente en el modal.
  */
  ionRangeIndependencia(event) {
    this.rangeIndependencia =  event.detail.value;
  }
   /*
    Método que obtiene la calificación de cubiertos que haya sido
    asignada al paciente en el modal.
  */
  ionRangeCubiertos(event) {
   this.rangeCubiertos = event.detail.value;
  }
  /*
    Método que obtiene la calificación de disfagia que haya sido
    asignada al paciente en el modal.
  */
  ionRangeDisfagia(event) {
    this.rangeDisfagia = event.detail.value;
  }
  /*
    Método que obtiene la cantidad de comida seleccionada en el modal.
  */
  radioCantidadComida(event) {
    this.cantidadComida = event.detail.value;

    switch(this.cantidadComida) {
      case 'poco':
        this.cantidadComida = 1;
        break;
      case 'normal':
        this.cantidadComida = 2;
        break;
      case 'mucho':
        this.cantidadComida = 3;
        break;
    }
  }
  /*
    Método que obtiene el tipo de comida seleccionado en el modal.
  */
  radioTipoComida(event) {
    this.tipoComida = event.detail.value;
  }
  /*
    Método que funciona para cerrar el modal.
  */
  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }
  /*
    Método que prepara los datos que van a ser enviados al servicio
    de putDailyRecordsMeal, estos datos son la cantidad de comida, 
    el tipo de comida, su calificación de independencia, funcional
    y disfagia.
  */
  salirConArgumentos() {
    let data = {
      quantity: this.cantidadComida,
      foodType: this.tipoComida,
      independence: this.rangeIndependencia,
      functional: this.rangeCubiertos,
      chewingPerformance: this.rangeDisfagia
    }
    
    this.dailyService.putDailyRecordsMeal(data, this.paciente._id).subscribe(res => {
      if(res.success === true) {
        this.disparaAlert('Datos enviados correctamente.')
        this.modalCtrl.dismiss();
      }
    }, err => {
      console.log(err);
    });
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
