import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { DailyRecordService } from 'src/app/services/daily-record.service';

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

  atencion = [];
  calculo = [];
  estimulacion = [];
  fisioterapia = [];
  lenguaje = [];
  memoria = [];
  reminiscencia = [];

  constructor(private catalogService:CatalogService,
              private dailyService:DailyRecordService) { }

  ngOnInit() {
  }

  segmentChangedRegistros( event ) {
    this.opcion = event.detail.value;
    console.log(this.opcion);
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

    console.log(this.busqueda, this.fase);
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
          case 'Fisioterapia':this.fisioterapia.push(r);
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
        console.log(array);
      }
    })
    this.calculo.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
        console.log(array);
      }
    })
    this.estimulacion.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
        console.log(array);
      }
    })
    this.fisioterapia.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
        console.log(array);
      }
    })
    this.lenguaje.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
        console.log(array);
      }
    })
    this.memoria.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
        console.log(array);
      }
    })
    this.reminiscencia.forEach(r => {
      if(r.selected === true) {
        let data = {
          name: r.name,
          classification: r.classification
        }
        array.push(data);
        console.log(array);
      }
    })

    let dailyprogram = {
      phase: 'Inicial',
      activities: array
    }
    console.log(dailyprogram);
    this.dailyService.postDailyProgram(dailyprogram).subscribe(res =>{
      console.log(res);
    });

  }

}
