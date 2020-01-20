import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  busqueda;
  pacientes = [];
  fase = 'inicial';
  constructor( private dailyService: DailyRecordService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getTodayDailyRecords();
  }

  getTodayDailyRecords() {
    // Se limpian los arreglos antes de agregar nuevos de distintas fases.
    this.pacientes = [];

    // Se obtienen todos los pacientes filtrados por su fase.
    this.dailyService.getDailyRecordsDate().subscribe(res => {
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
salir(){
 this.modalCtrl.dismiss();
}

}
