import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CatalogService } from 'src/app/services/catalog.service';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { ModalController } from '@ionic/angular';
import { PhaseModalActividadesPage } from '../phase-modal-actividades/phase-modal-actividades.page';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  opcion;
  contador;

  busqueda;
  fase = 'inicial';
  rol; 

  pacientes = [];

  atencion = [];
  calculo = [];
  estimulacion = [];
  lenguaje = [];
  memoria = [];
  reminiscencia = [];

  constructor( private catalogService:CatalogService,
               private dailyService:DailyRecordService,
               private modalCtrl: ModalController,
               private storage: Storage ) { }

  ngOnInit() {
    this.storage.get('Rol').then((val) => {
      this.rol = val;
    });
    this.getTodayDailyRecords();
  }

  segmentChangedRegistros( event ) {
    this.opcion = event.detail.value;
    switch( this.opcion ) {
      case 'programa':
        this.getCatolosTipos('actividad');
        break;
      case 'desempeno':
        break;
      default:
        break;
    }
  }
  eventListener( data: string ) {
    this.busqueda = data[0];
    this.fase = data[1];

    this.getTodayDailyRecords();
  }
  getTodayDailyRecords() {
    // Se limpian los arreglos antes de agregar nuevos de distintas fases.
    this.pacientes = [];
    
    // Se obtienen todos los pacientes filtrados por su fase.
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
      component: PhaseModalActividadesPage,
      componentProps: {
        paciente,
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
  }
  
/* 
    Método que sirve para volver mayúscula la primera letra de una palabra
    */
   capitalize( word: string ) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  

  selectedActivity( item ) {
    console.log(item);
  }
  getCatolosTipos(type:string){
    this.catalogService.getCatalogsType(type).subscribe(res =>{
      for( let i of res.catalogs ) {
        i['selected'] = false;
      }
      res.catalogs.forEach(r => {
        // if(r.classification === 'Memoria') {
        //   this.memoria.push(r);
        //   console.log(r);
        // }
        switch(r.classification){
          case 'Atención':this.atencion.push(r);
            break;
          case 'Cálculo':this.calculo.push(r);
            break;
          case 'Estimulación sensorial':this.estimulacion.push(r);
            break;
          case 'Lenguaje':this.lenguaje.push(r);
            break;
          case 'Memoria':this.memoria.push(r);
            break;
            case 'Reminiscencia':this.reminiscencia.push(r);
            break;
          default:
            break;  
        }
      });
      
    })
  }

  salirConArgumentos(){
    let array = [];

    this.atencion.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
      }
    })
    this.calculo.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
      }
    })
    this.estimulacion.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
      }
    })
    this.lenguaje.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
      }
    })
    this.memoria.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
      }
    })
    this.reminiscencia.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
      }
    })

    let dailyprogram = {
      phase: this.rol,
      activities: array
    }
    this.dailyService.postDailyProgram(dailyprogram).subscribe(res =>{
      console.log('respuesta servicio daily program', res);
    });

  }

}
