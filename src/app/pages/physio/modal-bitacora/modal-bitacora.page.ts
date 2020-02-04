import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CatalogService } from 'src/app/services/catalog.service';
import { Catalog } from 'src/app/interfaces/catalogs';
import { DailyRecordService } from 'src/app/services/daily-record.service';

@Component({
  selector: 'app-modal-bitacora',
  templateUrl: './modal-bitacora.page.html',
  styleUrls: ['./modal-bitacora.page.scss'],
})
export class ModalBitacoraPage implements OnInit {
  @Input() paciente;
  estados = ['negativo', 'neutral', 'positivo'];
  actividades: Catalog[] = [];

  humorAntes;
  humorDespues;

  horaInicio;
  horaFin;

  constructor( private modalCtrl: ModalController,
               private catalogService: CatalogService,
               private dailyService: DailyRecordService ) { }

  ngOnInit() {
    console.log(this.paciente);
    this.getCatalogsType();
  }

  getCatalogsType() {
    this.catalogService.getCatalogsType('actividad').subscribe(res => {
      res.catalogs.forEach( element => {
        if( element.classification === 'Fisioterapia' ) {
          element["selected"] = false;
          element["score"] = 0;
          this.actividades.push( element );
        }
      });
      console.log(...this.actividades);
    });
  }

  gethumorAntes( value ) {
    this.humorAntes = value;
  }
  gethumorDespues( value ) {
    this.humorDespues = value;
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  salirConArgumentos() {
    let actividadesSeleccionadas = [];

    this.actividades.forEach(element => {
      if(element.selected === true) {
        actividadesSeleccionadas.push({
          name: element.name,
          classification: element.classification,
          performance: element.score
        });
      }
    });
    switch( this.humorAntes ) {
      case 'negativo':
        this.humorAntes = 1;
        break;
      case 'neutral':
        this.humorAntes = 2;
        break;
      case 'positivo':
        this.humorAntes = 3;
        break;
    }
    switch( this.humorDespues ) {
      case 'negativo':
        this.humorDespues = 1;
        break;
      case 'neutral':
        this.humorDespues = 2;
        break;
      case 'positivo':
        this.humorDespues = 3;
        break;
    }
    let data = {
      startMood: this.humorAntes,
      endMood: this.humorDespues,
      startTime: this.horaInicio,
      endTime: this.horaFin,
      activities: actividadesSeleccionadas
    }
    console.log('data', data);

    this.dailyService.putDailyRecordsPhysio( this.paciente._id, data ).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    });

    // this.modalCtrl.dismiss();
  }

}
