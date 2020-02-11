import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';
import { ModalController } from '@ionic/angular';
import { ComidaModalPage } from '../comida-modal/comida-modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  }
  infoEnviada = false; // true o false

  pacientes = [];

  opcionDesempeno;
  opcionComida;

  constructor(private dailyService: DailyRecordService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  segmentChangedDesempeno(event) {
    this.opcionDesempeno = event.detail.value;
    console.log(this.opcionDesempeno);
    this.getDailyRecords();
  }

  segmentChangedComida(event) {
    this.opcionComida = event.detail.value;
    console.log(this.opcionComida);
  }

  getDailyRecords() {
    this.pacientes = [];
    this.dailyService.getDailyRecordsToday().subscribe(res => {
      res.drs.forEach(element => {
        this.pacientes.push(element);
      });
    });
  }

  rangeChange(event) {
    
  }

  sendDataDesempeno() {
    let activation = [];

    this.pacientes.forEach(element => {
      if (element.selected === true) {
        activation.push({
          id: element._id,
          performance: element.score
        });
      } else {
        activation.push({
          id: element._id,
          performance: 5
        });
      }
    });
    
    this.dailyService.putDailyRecordsCollation(activation).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });

  }

  sendData(comida) {
    let activation = [];

    this.pacientes.forEach(element => {
      activation.push({
        id: element._id,
        performance: 5
      });
    });
    
    if(comida === "colacion") {
      this.dailyService.putDailyRecordsCollation(activation).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    } else if(comida === "comida") {

    }
  }

  /*
    Método que abre el modal de comidas, esto solo en caso que
    haya sido seleccionada la opción de comida y reportar desempeño
    en la pantalla.
  */
  async openModal(paciente) {
    const modal = await this.modalCtrl.create({
      component: ComidaModalPage,
      componentProps: {
        paciente
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
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
