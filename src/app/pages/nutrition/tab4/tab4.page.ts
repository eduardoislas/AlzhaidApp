import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { ComidaModalPage } from '../comida-modal/comida-modal.page';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  pacientes = [];

  constructor(private dailyService: DailyRecordService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getDailyRecords();
  }

  getDailyRecords() {
    this.pacientes = [];
    this.dailyService.getDailyRecordsToday().subscribe(res => {
      res.drs.forEach(element => {
        this.pacientes.push(element);
      });
    });
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
