import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CatalogService } from 'src/app/services/catalog.service';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { ModalController } from '@ionic/angular';
import { PhaseModalActividadesPage } from '../phase-modal-actividades/phase-modal-actividades.page';
import { Info } from "../../../interfaces/daily-records";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  opcion;

  busqueda;
  fase;
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
  }

  segmentChangedRegistros( event ) {
    this.opcion = event.detail.value;
     this.opcion === 'programa' ? this.getCatalogosTipo('actividad') : this.getTodayDailyRecords();
  }
  /* 
    Método que obtiene el arreglo enviado por el componente
    searchbar.
  */
  searchBar( event ) {
    this.busqueda = event.detail.value;

    console.log(this.busqueda);
  }
  /* 
    Método encargado de limpiar el arreglo de pacientes, llamar al servicio
    de getDailyRecordsDate() el cual obtiene los dailyRecords del día y los
    filtra por la fase elegida en el ion segment.
  */
  getTodayDailyRecords() {
    // Se limpian los arreglos antes de agregar nuevos de distintas fases.
    this.pacientes = [];
    
    switch( this.rol ) {
      case 'FASE_INICIAL':
        this.fase = 'inicial';
        break;
      case 'FASE_INTERMEDIA':
        this.fase = 'intermedia';
        break;
      case 'FASE_AVANZADA':
        this.fase = 'avanzada';
        break;
    }

    // Se obtienen todos los pacientes filtrados por su fase.
      this.dailyService.getDailyRecordsDate().subscribe(res => {
        res.drs.forEach(r => {
          if( r.patient.phase === this.capitalize( this.fase ) ) {
            this.pacientes.push( r );
          }
        });
      });
  }
  /* 
    Método encargado de abrir el modal de actividades.
  */
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
  /* 
    Método encargado de llamar el servicio getCatalogsType() el
    cual se encarga de traer el catalogo de actividades, filtrar
    el tipo de actividad y guardarlo en su respectivo arreglo.
  */
  getCatalogosTipo( type:string ){
    this.catalogService.getCatalogsType( type ).subscribe(res =>{
      for( let i of res.catalogs ) {
        i['selected'] = false;
      }
      res.catalogs.forEach(r => {
        switch( r.classification ){
          case 'Atención':
            this.atencion.push( r );
            break;
          case 'Cálculo':
            this.calculo.push( r );
            break;
          case 'Estimulación sensorial':
            this.estimulacion.push( r );
            break;
          case 'Lenguaje':
            this.lenguaje.push( r );
            break;
          case 'Memoria':
            this.memoria.push( r );
            break;
            case 'Reminiscencia':
              this.reminiscencia.push( r );
            break;
        }
      });
    });
  }
  /*
    Método que sirve para enviar los datos seleccionados en
    el modal de actividades, esto utilizando el servicio postDailyProgram().
  */
  salirConArgumentos(){
    let attention = [];
    let calculus = [];
    let sensory = [];
    let language = [];
    let memory = [];
    let reminiscence = [];

    this.atencion.forEach( r => {
      if(r.selected === true) {
        let data: Info = {
          name: r.name,
          classification: r.classification
        }
        attention.push(data);
      }
      
    });

    this.calculo.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        calculus.push(data);
      }
    });

    this.estimulacion.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        sensory.push(data);
      }
    });

    this.lenguaje.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        language.push(data);
      }
    });

    this.memoria.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        memory.push(data);
      }
    });

    this.reminiscencia.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        reminiscence.push(data);
      }
    });

    let dailyProgram = {
      phase: this.rol,
      activities: {
        attention,
        calculus,
        sensory,
        language,
        memory,
        reminiscence
      }
    };

    console.log(dailyProgram);
    this.dailyService.postDailyProgram( dailyProgram ).subscribe(res =>{
      console.log('Servicio', res);
    }, err => {
      console.log('Error servicio', err);
    });

  }

}
