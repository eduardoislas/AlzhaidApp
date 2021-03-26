import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { NutritionService } from 'src/app/services/nutrition/nutrition.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab-comida.page.html',
  styleUrls: ['./tab-comida.page.scss'],
})
export class TabComidaPage implements OnInit {
  clickEventsubscription: Subscription;
  rutaActual = this.router.url;
  pacientes = [];

  constructor(
    private dailyService: DailyRecordService,
    private router: Router,
    private nutritionService: NutritionService,
  ) {
    this.clickEventsubscription = this.nutritionService
      .getClickEvent()
      .subscribe(() => {
        this.getDailyRecords();
      });
  }

  ngOnInit() {
    this.getDailyRecords();
  }

  /**
   * Método getDailyRecords() obtiene los dailyRecords del día y los
   * mete en el arreglo de pacientes.
   */
  getDailyRecords() {
    this.pacientes = [];
    this.dailyService.getDailyRecordsToday().subscribe(res => {
      res.drs.forEach(element => {
        this.pacientes.push(element);
      });
    });
  }

  /**
  *  Método que abre la pagina de comidas, esto solo en caso que
  *  haya sido seleccionada la opción de comida y reportar desempeño
  *  en la pantalla.
  */
  openComida(paciente) {
    this.router.navigateByUrl(`${this.rutaActual}/page-comida`, { state: { data: paciente } });
  }

}
