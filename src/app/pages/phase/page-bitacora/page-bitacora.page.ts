import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { Location } from "@angular/common";
import { mostrarAlertaConfirmacion, mostrarAlertaError } from '../../../helpers/alert-helper';

@Component({
  selector: 'app-page-bitacora',
  templateUrl: './page-bitacora.page.html',
  styleUrls: ['./page-bitacora.page.scss'],
})
export class PageBitacoraPage implements OnInit {
  paciente;

  tiempoSeleccionado;
  valorRange;

  toggleConducta = true;

  catalogoConductas = [];
  infoConductas = [];

  constructor( private catalogService: CatalogService,
               private dailyService: DailyRecordService,
               private location: Location ) { }

  ngOnInit() {
    this.paciente = history.state.data;
    this.getCatalogs('conducta');
  }

  /**
  *  Método que obtiene el momento del día seleccionado
  *  (Mañana o Tarde) en el Phase-Modal.
  */
  timeOfDay(time) {
    this.tiempoSeleccionado = time.detail.value;
  }
  /**
  *  Método que obtiene los valores de los ion range de los
  *  comportamientos o conductas seleccionados en el Phase-Modal.
  */
  activityScore(score) {
    this.valorRange = score.detail.value;
  }
  /**
  *  Método que obtiene los catalogos de Conducta, Comportamientos
  *  o Crisis según el seleccionado en bitácora. Estos utilizan el
  *  servicio de obtener catalogos por tipo y los guarda en el arreglo
  *  catalogoConductas.
  */
  getCatalogs(type: string) {
    this.catalogService.getCatalogsType(type).subscribe(res => {
      for (let i of res.catalogs) {
        i["selected"] = false;
        i["score"] = 0;
      }
      this.catalogoConductas.push(...res.catalogs);
    });
  }
  /** 
  *  Botón para salir de la página sin enviar datos.
  */
  salirSinArgumentos() {
    this.location.back();
  }
  /**
  *  Botón para envíar los datos a la base de datos y salir
  * de la página.
  */
  salirConArgumentos() {
    let conductasSeleccionadas = [];

    this.catalogoConductas.forEach(res => {
      if(res.score === undefined) res.score = 0;

      if (res.selected === true) {
        let data = {
          name: res.name,
          time: this.tiempoSeleccionado,
          score: res.score
        };
        conductasSeleccionadas.push(data);
      }
    });

    this.dailyService
      .putBehaviorDailyRecords(this.paciente._id, conductasSeleccionadas)
      .subscribe(
        res => {
          if(res.success === true) {
            mostrarAlertaConfirmacion("Conductas actualizadas exitosamente");
            this.location.back();
          }
        },
        err => {
          mostrarAlertaError(err);
        }
      );
  }
}