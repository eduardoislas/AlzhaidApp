import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comida-modal',
  templateUrl: './comida-modal.page.html',
  styleUrls: ['./comida-modal.page.scss'],
})
export class ComidaModalPage implements OnInit {
  @Input() paciente; // Paciente obtenido al abrir el modal.

  rangeIndependencia = 0;
  rangeCubiertos = 0;
  rangeDisfagia = 0;

  cantidadComida;
  tipoComida;


  constructor(private modalCtrl: ModalController,
    private dailyService: DailyRecordService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  /**
  *  Método que obtiene la calificación de independencia que haya sido
  *  asignada al paciente en el modal.
  */
  ionRangeIndependencia(event) {
    this.rangeIndependencia = event.detail.value;
  }
  /**
 *  Método que obtiene la calificación de cubiertos que haya sido
 *  asignada al paciente en el modal.
 */
  ionRangeCubiertos(event) {
    this.rangeCubiertos = event.detail.value;
  }
  /**
  *  Método que obtiene la calificación de disfagia que haya sido
  *  asignada al paciente en el modal.
  */
  ionRangeDisfagia(event) {
    this.rangeDisfagia = event.detail.value;
  }
  /**
  * Este método se encarga de obtener del grupo de radio buttons
  * cual fue el seleccionado, posteriormente realiza una conversión
  * númerica según sea el caso.
  */
  radioCantidadComida(event) {
    this.cantidadComida = event.detail.value;

    switch (this.cantidadComida) {
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
  /**
  * Método que obtiene el tipo de comida seleccionado en el modal.
  */
  radioTipoComida(event) {
    this.tipoComida = event.detail.value;
  }
  /**
  *  Método que funciona para cerrar el modal.
  */
  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }
  /**
   * Método salirConArgumentos verifica que los datos a envíar no son vacíos,
   * los prepara en un objeto y los envía mendiante el servicio putDailyRecordsMeal
   * junto con el ID del dailyRecord del paciente.
  */
  salirConArgumentos() {
    // If para comprobar si los datos están vacíos, no permitir que los datos
    // sean enviados.
    if (this.cantidadComida === null || this.cantidadComida === undefined) {
      this.presentToast('"¿Cuánto comió?" Faltante');
      return;
    } else if (this.tipoComida === null || this.tipoComida === undefined) {
      this.presentToast('"Tipo de comida" Faltante');
      return;
    }
    // En caso que todos los datos tengan valor, prepara los datos para
    // ser envíados.
    let data = {
      quantity: this.cantidadComida,
      foodType: this.tipoComida,
      independence: this.rangeIndependencia,
      functional: this.rangeCubiertos,
      chewingPerformance: this.rangeDisfagia
    }

    // Envía al servicio el objeto data y el id del dailyRecord del paciente, si la
    // respuesta es success, muestra el mensaje de sweetalert y cierra el modal.
    this.dailyService.putDailyRecordsMeal(data, this.paciente._id).subscribe(res => {
      if (res.success === true) {
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

  /**
  *  Muestra un mensaje de error cuando faltan datos por llenar
  *  en el modal.
  *  @param message mensaje que mostrará la alerta.
  */
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

}
