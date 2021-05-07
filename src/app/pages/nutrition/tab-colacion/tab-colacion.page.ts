import { Component, OnInit } from "@angular/core";
import { mostrarAlertaConfirmacion } from "src/app/helpers/alert-helper";
import { DailyRecordService } from "src/app/services/daily-record.service";

@Component({
  selector: "app-tab2",
  templateUrl: "./tab-colacion.page.html",
  styleUrls: ["./tab-colacion.page.scss"],
})
export class TabColacionPage implements OnInit {
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  pacientes = []; // arreglo con los pacientes del día.
  opcionDesempeno; // opción seleccionada en el ionSegment.

  constructor(private dailyService: DailyRecordService) {}

  ngOnInit() {
    this.opcionDesempeno = "reporte";
    this.getDailyRecords();
  }

  /**
   * Método segmentChangedDesempeno(event) asigna a la variable opcionDesempeno
   * el valor del ionSegment, obtenido mediante el evento del parametro.
   * @param event evento regresado por el ionSegment.
   */
  segmentChangedDesempeno(event) {
    // Asigna a la variable opcionDesempeno el valor del ionSegment
    this.opcionDesempeno = event.detail.value;
    // Si la variable opcionDesempeno es reporte, busca los dailyRecords del día.
    // if(this.opcionDesempeno === 'reporte')  this.getDailyRecords();
  }

  /**
   * Método getDailyRecords() obtiene los dailyRecords del día actual
   * y los mete al arreglo de pacientes.
   */
  getDailyRecords() {
    this.pacientes = [];
    this.dailyService.getDailyRecordsToday().subscribe((res) => {
      res.drs.forEach((element) => {
        this.pacientes.push(element);
      });
    });
  }

  /**
   * Método sendDataDesempeno() busca los pacientes que fueron seleccionados
   * manualmente y agrega al arreglo activación su ID de dailyRecord y su socre
   * del performance. En caso de no ser seleccionado, los agrega igualmente pero
   * con performance 5 por default.
   */
  sendDataDesempeno() {
    // Arreglo donde se guardarán los objetos con el ID del dailyRecord de los
    // pacientes y su performance.
    let activation = [];

    // Se recorre el arreglo de pacientes, el cual fue llenado con el servicio
    // de dailyRecords
    this.pacientes.forEach((element) => {
      // Si no se asignó valor, queda en 0
      if (element.score === undefined) element.score = 0;
      // Si el paciente ha sido seleccionado
      if (element.selected === true) {
        activation.push({
          id: element._id,
          performance: element.score,
        });
        // Si el paciente no ha sido seleccionado.
      } else {
        activation.push({
          id: element._id,
          performance: 5,
        });
      }
    });

    // Envía al servicio el arreglo de activación con los objetos previamente llenados.
    this.dailyService.putDailyRecordsCollation(activation).subscribe(
      (res) => {
        // Si la respuesta es true, despliega el alerta y convierte la variable
        // infoEnviada en true.
        if (res.success === true) {
          mostrarAlertaConfirmacion("Datos enviados correctamente.");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Método sendMassivaData() recorre el arreglo de pacientes y por cada uno de ellos
   * prepara un objeto con su ID de dailyRecord y un performance 5 por default, lo
   * mete al arreglo de activation y después son envíados a través del servicio.
   */
  sendMassiveData() {
    // arreglo a ser llenado.
    let activation = [];

    // Por cada paciente, prepara el objeto con su ID de dailyRecord y un performance 5.
    this.pacientes.forEach((element) => {
      activation.push({
        id: element._id,
        performance: 5,
      });
    });

    // Envía a través del servicio el arreglo activation, el cual fue llenado previamente.
    this.dailyService.putDailyRecordsCollation(activation).subscribe(
      (res) => {
        // Si la respuesta del servicio es true, dispara el alerta y cambia la variable
        // infoEnviada a true.
        if (res.success === true) {
          mostrarAlertaConfirmacion("Datos enviados correctamente.");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
