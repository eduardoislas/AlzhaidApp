import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-phase-modal-actividades',
  templateUrl: './phase-modal-actividades.page.html',
  styleUrls: ['./phase-modal-actividades.page.scss'],
})
export class PhaseModalActividadesPage implements OnInit {
  actividades = [];

  constructor(private dailyService:DailyRecordService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.dailyService.getDailyRecordsActivities().subscribe(res => {
      console.log('daily records activitie', res);
      // res.dps.forEach(r => {
      //   if( r.activities === this.capitalize(this.fase) ) {
      //     this.pacientes.push( r );
      //   }
      // });
    });
  }

  EnviarDatos(){
    this.modalCtrl.dismiss();
  }

}
