import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSegment, ModalController } from "@ionic/angular";
import { DailyRecordService } from "src/app/services/daily-record.service";
import { PhaseModalPage } from "../phase-modal/phase-modal.page";
import { Storage } from "@ionic/storage";

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

  rol;

  pacientes = [];

  constructor(
    private dailyService: DailyRecordService,
    private modalCtrl: ModalController,
    private storage: Storage,
  ) {}

  ngOnInit() {
    this.storage.get("Rol").then(val => {
      this.getTodayDailyRecords(val);
    });
    this.iSegment.value = this.tipoBitacora;
  }
  /* 
    Método que checa la opción seleccionada en el IonSegment 
    (Conducta, Comportamiento o Crisis), lo iguala a tipoBitacora 
    y nomas por ahora.
  */
  segmentChanged(event) {
    this.tipoBitacora = event.detail.value;
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
  getTodayDailyRecords(value: string) {
    // Se limpian los arreglos antes de agregar nuevos de distintas fases.
    this.pacientes = [];
    
    switch( value ) {
      case 'FASE_INICIAL':
        this.rol = 'Inicial';
        break;
      case 'FASE_INTERMEDIA':
        this.rol = 'Intermedia';
        break;
      case 'FASE_AVANZADA':
        this.rol = 'Avanzada';
        break;
    }
    // Se obtienen todos los pacientes filtrados por su fase.
    this.dailyService.getDailyRecordsToday().subscribe(res => {
      res.drs.forEach(r => {
        if (r.patient.phase === this.rol) {
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
