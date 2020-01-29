import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { ModalController } from '@ionic/angular';
import { HygieneModalPage } from '../hygiene-modal/hygiene-modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pacientes = [];
  busqueda;
  fase = 'inicial';

  constructor(private dailyService: DailyRecordService,
              private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.getTodayDailyRecords();
  }

  getTodayDailyRecords() {
    // Se limpian los arreglos antes de agregar nuevos de distintas fases.
    this.pacientes = [];

    // Se obtienen todos los pacientes filtrados por su fase.
    this.dailyService.getDailyRecordsToday().subscribe(res => {
        res.drs.forEach(r => {
          if ( r.patient.phase === this.capitalize(this.fase) ) {
            this.pacientes.push( r );
          }
        });
      });
  }

  capitalize( word: string ) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  eventListener( data: string ) {
      this.busqueda = data[0];
      this.fase = data[1];
      this.getTodayDailyRecords();
  }

  async openModal( paciente ) {
    const modal = await this.modalCtrl.create({
      component: HygieneModalPage,
      componentProps: {
        paciente,
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log('Retorno modal', data);
  }

}
