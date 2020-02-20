import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pacientes = [];
  busqueda;
  fase = 'inicial';
  rutaActual = this.router.url;

  constructor(private dailyService: DailyRecordService,
              private router: Router ) { }

  ngOnInit() {
    this.getTodayDailyRecords();
  }

  getTodayDailyRecords() {
    // Se limpian los arreglos antes de agregar nuevos de distintas fases.
    this.pacientes = [];

    // Se obtienen todos los pacientes filtrados por su fase.
    this.dailyService.getDailyRecordsToday().subscribe(res => {
        res.drs.forEach(r => {
          if ( r.patient.phase === this.capitalize(this.fase) ) {
            this.pacientes.push( r );
          }
        });
      });
  }

  capitalize( word: string ) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  eventListener( data: string ) {
      this.busqueda = data[0];
      this.fase = data[1];
      this.getTodayDailyRecords();
  }

  async openPage( paciente ) {
    this.router.navigateByUrl( `${this.rutaActual}/hygiene-bitacora`, {state: {data: paciente}} );
  }
}
