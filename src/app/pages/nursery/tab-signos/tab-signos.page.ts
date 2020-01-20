import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { ModalController } from '@ionic/angular';
import { NurseryModalPage } from '../nursery-modal/nursery-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab-signos.page.html',
  styleUrls: ['./tab-signos.page.scss'],
})
export class TabSignosPage implements OnInit {
  busqueda;
  fase = 'inicial';

  pacientes = [];

  constructor( private dailyService: DailyRecordService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.patientsRole();
  }

  /* 
    Método encargado de escuchar los datos del arreglo proviniente
    del componente de searchbar, setear los valores a sus respectivas
    vabiables y llamar al método patientsRole.
  */
  eventListener( data: string ) {
    this.busqueda = data[0];
    this.fase = data[1];
    
    this.patientsRole();
  }
  /* 
    Método que obtiene a los pacientes según su fase:
    Inicial, Intermedia o Avanzada.
    Estos pacientes son guardados en el arreglo de pacientes.
  */
  patientsRole() {
    // Se limpian los arreglos para agregar los de distintas fases
    this.pacientes = [];

      this.dailyService.getDailyRecordsDate().subscribe(res => {
        res.drs.forEach(r => {
          if( r.patient.phase === this.capitalize(this.fase) ) {
            this.pacientes.push( r );
          }
        });
      });
    }
    async openModal( paciente ) {
      const modal = await this.modalCtrl.create({
        component: NurseryModalPage,
        componentProps: {
          paciente
        }
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      console.log('Retorno modal', data);
    }
    /* 
    Método que sirve para volver mayúscula la primera letra de una palabra
    */
    capitalize( word: string ) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

}
