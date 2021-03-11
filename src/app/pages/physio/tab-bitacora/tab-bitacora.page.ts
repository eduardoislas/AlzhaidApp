import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab-bitacora.page.html',
  styleUrls: ['./tab-bitacora.page.scss'],
})
export class TabBitacoraPage implements OnInit {
  rutaActual = this.router.url;
  busqueda;
  fase = 'inicial';

  pacientes = [];
  pacientesStrings = []; // variable para guardar pacientes stringificados 

  constructor(private dailyService: DailyRecordService,
    private router: Router) { }

  ngOnInit() {
    this.getPatients();
  }
  eventListener(data: string) {
    this.busqueda = data[0];
    this.fase = data[1];
    this.getPatients();
  }
  getPatients() {
    this.pacientes = [];
    this.pacientesStrings = [];

    this.dailyService.getDailyRecordsToday().subscribe(res => {
      res.drs.forEach(r => {
        if (r.patient.phase === this.capitalize(this.fase)) {
          if (!this.pacientesStrings.includes(JSON.stringify(r))) {//Condicional para verificar que si un paciente ya esta en el arreglo, no se vuelva a incluir
            this.pacientesStrings.push(JSON.stringify(r));//Agregar paciente stringificado para poder verificar con el metodo includes
            this.pacientes.push(r);
          }
        }
      });
    });
  }
  openBitacora(paciente) {
    this.router.navigateByUrl(`${this.rutaActual}/page-bitacora`, { state: { data: paciente } });
  }

  /* 
    Método que sirve para volver mayúscula la primera letra de una palabra
    */
  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}
