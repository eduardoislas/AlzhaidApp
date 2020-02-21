import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSegment } from "@ionic/angular";
import { DailyRecordService } from "src/app/services/daily-record.service";
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';

@Component({
  selector: "app-tab3",
  templateUrl: "./tab-bitacora.page.html",
  styleUrls: ["./tab-bitacora.page.scss"]
})
export class TabBitacoraPage implements OnInit {
  @ViewChild(IonSegment, { static: true }) iSegment: IonSegment;
  
  busqueda;
  fase = "inicial";
  
  rol;
  
  pacientes = [];
  rutaActual = this.router.url;

  constructor(
    private dailyService: DailyRecordService,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {
    this.storage.get("Rol").then(val => {
      this.getTodayDailyRecords(val);
    });
  }
  
  openBitacora(paciente) {
    this.router.navigateByUrl( `${this.rutaActual}/page-bitacora`, {state: {data: paciente}} );
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
