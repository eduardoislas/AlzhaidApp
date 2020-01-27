import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSegment, ModalController } from "@ionic/angular";
import { DailyRecordService } from "src/app/services/daily-record.service";
import { PhasePageModule } from "../phase.module";
import { PhaseModalPageModule } from "../phase-modal/phase-modal.module";
import { PhaseModalPage } from "../phase-modal/phase-modal.page";

@Component({
  selector: "app-tab3",
  templateUrl: "./tab3.page.html",
  styleUrls: ["./tab3.page.scss"]
})
export class Tab3Page implements OnInit {
  @ViewChild(IonSegment, { static: true }) iSegment: IonSegment;

  tipoBitacora = "conducta";
  busqueda;
  fase = "inicial";

  pacientes = [];

  constructor(
    private dailyService: DailyRecordService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.iSegment.value = this.tipoBitacora;
    this.getTodayDailyRecords();
  }

  /* 
    Método que checa la opción seleccionada en el IonSegment 
    (Conducta, Comportamiento o Crisis), lo iguala a tipoBitacora 
    y nomas por ahora.
  */
  segmentChanged(event) {
    this.tipoBitacora = event.detail.value;

    switch (this.tipoBitacora) {
      case "conducta":
        this.getTodayDailyRecords();
        break;
      default:
        return;
    }
  }
  /* 
    Método encargado de escuchar el segundo dato del arreglo proviniente
    del componente de searchbar ( el cual es la fase del paciente).
  */
  eventListener(data: string) {
    this.busqueda = data[0];
    this.fase = data[1];

    this.getTodayDailyRecords();
  }
  async openModal(paciente) {
    const modal = await this.modalCtrl.create({
      component: PhaseModalPage,
      componentProps: {
        paciente,
        tipoBitacora: this.tipoBitacora
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("Retorno modal", data);
  }
  getTodayDailyRecords() {
    // Se limpian los arreglos antes de agregar nuevos de distintas fases.
    this.pacientes = [];

    // Se obtienen todos los pacientes filtrados por su fase.
    this.dailyService.getDailyRecordsDate().subscribe(res => {
      res.drs.forEach(r => {
        if (r.patient.phase === this.capitalize(this.fase)) {
          this.pacientes.push(r);
        }
      });
    });
  }
  /* 
    Método que sirve para volver mayúscula la primera letra de una palabra
    */
  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
