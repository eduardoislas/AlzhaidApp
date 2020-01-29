import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { ModalBitacoraPageModule } from '../modal-bitacora/modal-bitacora.module';
import { ModalController } from '@ionic/angular';
import { ModalBitacoraPage } from '../modal-bitacora/modal-bitacora.page';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  busqueda;
  fase = 'inicial';

  pacientes = [];

  constructor( private dailyService: DailyRecordService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.getPatients();
  }
  eventListener( data: string ) {
    this.busqueda = data[0];
    this.fase = data[1];

    this.getPatients();
  }
  getPatients() {
    this.pacientes = [];

    this.dailyService.getDailyRecordsToday().subscribe(res => {
      console.log(res);
      res.drs.forEach(r => {
        if (r.patient.phase === this.capitalize(this.fase)) {
          this.pacientes.push(r);
        }
      });
    });
  }
  async openModal(paciente) {
    const modal = await this.modalCtrl.create({
      component: ModalBitacoraPage,
      componentProps: {
        paciente
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("Retorno modal", data);
  }

  /* 
    Método que sirve para volver mayúscula la primera letra de una palabra
    */
   capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}
