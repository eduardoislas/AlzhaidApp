import { Component, OnInit, Input } from "@angular/core";
import { Catalog } from "src/app/interfaces/catalogs";
import { CatalogService } from "src/app/services/catalog.service";
import { DailyRecordService } from "src/app/services/daily-record.service";
import { Router } from "@angular/router";
import { RootDaily } from '../../../interfaces/daily-records';
import { PhysioService } from '../../../services/physio/physio.service';
import { mostrarAlerta } from "src/app/helpers/alert-helper";
import { mostrarAlertaAdvertencia, mostrarAlertaConfirmacion, mostrarAlertaGrande } from '../../../helpers/alert-helper';

@Component({
  selector: "app-page-bitacora",
  templateUrl: "./page-bitacora.page.html",
  styleUrls: ["./page-bitacora.page.scss"],
})
export class PageBitacoraPage implements OnInit {
  dailyRecord;

  estadoAntes;
  estadoDespues;

  actividades: Catalog[] = [];

  humorAntes;
  humorDespues;

  today;

  //dailyRecord;
  horaInicio;
  horaFin;

  constructor(
    private catalogService: CatalogService,
    private dailyService: DailyRecordService,
    private router: Router,
    private physioService: PhysioService
  ) { }

  ngOnInit() {
    this.today = new Date();

    this.horaInicio = this.today.toISOString();
    this.horaFin = this.today.toISOString();

    this.dailyRecord = history.state.data;
    this.getCatalogsType();
    this.verificarSobreescribirBitacora();
  }

  verificarSobreescribirBitacora() {
    if (this.dailyRecord.physioBinnacle.status) { // Si ya tiene un registro en la bitacora de fisioterapia
      mostrarAlertaGrande('Ya hay una bitácora', "¿Desea sobreescribirla?", 'warning', '/physio', this.router);
    }
  }

  getDailyRecord() {
    this.dailyService
      .getDailyRecordTodayPatient(this.dailyRecord.patient._id)
      .subscribe((res) => {
        this.dailyRecord = (res as RootDaily).drs;
        console.log(this.dailyRecord);
        console.log(this.dailyRecord.patient._id);
      });
  }

  /*
    Método que obtiene los catálogos de actividades, se filtran los
    de fisioterapia, se les agrega un campo selected y score y finalmente
    se agregan al arreglo de actividades.
  */
  getCatalogsType() {
    this.catalogService.getCatalogsType("actividad").subscribe((res) => {
      res.catalogs.forEach((element) => {
        if (element.classification === "Fisioterapia") {
          element["selected"] = false;
          element["score"] = 0;
          this.actividades.push(element);
        }
      });
    });
  }

  /*
    Método que obtiene el valor del humor antes de la sesión, esto
    según el botón clickeado en la interfaz.
  */
  radioAntesComida(event) {
    this.humorAntes = event.detail.value;
  }
  valorRadioAntesComida(valor: Number) {
    this.humorAntes = valor;
  }
  /*
    Método que obtiene el valor del humor después de la sesión, esto
    según el botón clickeado en la interfaz.
  */
  radioDespuesComida(event) {
    this.humorDespues = event.detail.value;
  }

  /*
    Método para salir sin argumentos del modal.
  */
  salirSinArgumentos() {
    this.router.navigateByUrl("physio/tab-bitacora");
  }

  /*
    Método que recorre las habilidades de fisioterapia, selecciona
    las cuales fueron seleccionadas y asignadas con un score y las
    mete en el arreglo de actividades seleccionadas a modo de objeto.
    Los switch son para cambiar el valor de los humores según el que
    fue seleccionado, prepara la información y la envía en el servicio.
  */
  salirConArgumentos() {
    let actividadesSeleccionadas = [];

    this.actividades.forEach((element) => {
      if (element.selected === true) {
        actividadesSeleccionadas.push({
          name: element.name,
          classification: element.classification,
          performance: element.score,
        });
      }
    });
    switch (this.humorAntes) {
      case "negativo":
        this.humorAntes = 1;
        break;
      case "neutral":
        this.humorAntes = 2;
        break;
      case "positivo":
        this.humorAntes = 3;
        break;
    }
    switch (this.humorDespues) {
      case "negativo":
        this.humorDespues = 1;
        break;
      case "neutral":
        this.humorDespues = 2;
        break;
      case "positivo":
        this.humorDespues = 3;
        break;
    }

    if (
      actividadesSeleccionadas.length &&
      this.humorAntes != undefined &&
      this.humorDespues != undefined
    ) {
      // Si el registro no es vacío guardalo

      let auxHoraInicio = new Date(this.horaInicio);
      let auxHoraFin = new Date(this.horaFin);

      if (auxHoraFin >= auxHoraInicio) {
        // Si la hora fin es mayor o igual a la de entrada
        let data = {
          startMood: this.humorAntes,
          endMood: this.humorDespues,
          startTime: auxHoraInicio.toISOString(),
          endTime: auxHoraFin.toISOString(),
          activities: actividadesSeleccionadas,
        };
        console.log(data);

        this.dailyService
          .putDailyRecordsPhysio(this.dailyRecord._id, data)
          .subscribe(
            (res) => {
              if (res.success === true) {
                mostrarAlertaConfirmacion("Datos enviados correctamente");
                this.router.navigateByUrl("physio/tab-bitacora");
                this.physioService.sendClickEvent();

                console.log(this.humorAntes);
                console.log(this.humorDespues);
              }
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        // Si la hora fin NO es mayor o igual a la de entrada
        mostrarAlertaAdvertencia("Horas no válidas");
      }
    } else {
      // Si el registro es vacío no lo guardes y muestra un mensaje de error
      mostrarAlertaAdvertencia("Bitácora vacía");
    }
  }
}
