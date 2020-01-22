import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-phase-modal-actividades',
  templateUrl: './phase-modal-actividades.page.html',
  styleUrls: ['./phase-modal-actividades.page.scss'],
})
export class PhaseModalActividadesPage implements OnInit {
  actividades = [];

  rol;

  constructor( private dailyService:DailyRecordService,
               private modalCtrl: ModalController,
               private storage: Storage ) { }

  ngOnInit() {
    this.storage.get('Rol').then((val) => {
      this.rol = val;
    });

    this.dailyService.getDailyRecordsActivities().subscribe(res => {
      res.dps.forEach(element => {
        if( element.phase === this.rol ) {
          
        }
      });
      console.log('Act DR', this.actividades);
    });
  }

  EnviarDatos(){
    this.modalCtrl.dismiss();
  }
  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

}
