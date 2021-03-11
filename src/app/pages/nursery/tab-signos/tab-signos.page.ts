import { Component, OnInit } from "@angular/core";
import { DailyRecordService } from "src/app/services/daily-record.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-tab3",
  templateUrl: "./tab-signos.page.html",
  styleUrls: ["./tab-signos.page.scss"]
})
export class TabSignosPage implements OnInit {
  rutaActual = this.router.url;

  busqueda;
  fase = "inicial";

  pacientes = [];
  pacientesStrings = []; // variable para guardar pacientes stringificados 

  constructor(
    private dailyService: DailyRecordService,
    private router: Router
  ) { }

  ngOnInit() {
    this.patientsRole();
    console.log(this.rutaActual);
  }

  /* 
    Método encargado de escuchar los datos del arreglo proviniente
    del componente de searchbar, setear los valores a sus respectivas
    vabiables y llamar al método patientsRole.
  */
  eventListener(data: string) {
    this.busqueda = data[0];
    this.fase = data[1];
    this.patientsRole();
  }

  /* 
    Método que obtiene a los pacientes según su fase:
    Inicial, Intermedia o Avanzada.
    Estos pacientes son guardados en el arreglo de pacientes.
  */
  patientsRole() {
    // Se limpian los arreglos para agregar los de distintas fases
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
  openSignos(paciente) {
    this.router.navigateByUrl(`${this.rutaActual}/signos`, { state: { data: paciente } });
  }
  /* 
    Método que sirve para volver mayúscula la primera letra de una palabra
    */
  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
