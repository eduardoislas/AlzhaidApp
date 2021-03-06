import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { DailyRecordService } from "src/app/services/daily-record.service";
import { Router } from "@angular/router";
import { Dr } from '../../../interfaces/daily-records';
import { NutritionService } from "src/app/services/nutrition/nutrition.service";
import { mostrarAlertaGrande, mostrarAlertaConfirmacion } from '../../../helpers/alert-helper';

@Component({
  selector: "app-page-comida",
  templateUrl: "./page-comida.page.html",
  styleUrls: ["./page-comida.page.scss"],
})
export class PageComidaPage implements OnInit {
  paciente; // Realmente obtuvimos el dailyRecord

  rangeIndependencia = 0;
  rangeCubiertos = 0;
  rangeDisfagia = 0;

  cantidadComida;
  tipoComida;

  dailyRecord: Dr;

  constructor(
    private dailyService: DailyRecordService,
    private toastCtrl: ToastController,
    private router: Router,
    private nutritionService: NutritionService,
  ) { }

  ngOnInit() {
    this.paciente = history.state.data;
    this.verificarSobreescribirComida();
  }

  verificarSobreescribirComida() {
    if (this.paciente.meal) {
      mostrarAlertaGrande('Ya hay una comida registrada', '¿Desea sobreescribirla?', 'warning', '/nutrition', this.router);
    }
  }

  /**
   *  Método que obtiene la calificación de independencia que haya sido
   *  asignada al paciente.
   */
  ionRangeIndependencia(event) {
    this.rangeIndependencia = event.detail.value;
  }
  /**
   *  Método que obtiene la calificación de cubiertos que haya sido
   *  asignada al paciente.
   */
  ionRangeCubiertos(event) {
    this.rangeCubiertos = event.detail.value;
  }
  /**
   *  Método que obtiene la calificación de disfagia que haya sido
   *  asignada al paciente.
   */
  ionRangeDisfagia(event) {
    this.rangeDisfagia = event.detail.value;
  }
  /**
   * Este método se encarga de obtener del grupo de radio buttons
   * la cantidad de comida la cual fue el seleccionado, posteriormente
   * realiza una conversión númerica según sea el caso.
   */
  radioCantidadComida(event) {
    this.cantidadComida = event.detail.value;

    switch (this.cantidadComida) {
      case "poco":
        this.cantidadComida = 1;
        break;
      case "normal":
        this.cantidadComida = 2;
        break;
      case "mucho":
        this.cantidadComida = 3;
        break;
    }
  }
  /**
   * Método que obtiene el tipo de comida seleccionado.
   * Pudiendo ser este: Papilla, Normal o Triturada.
   */
  radioTipoComida(event) {
    this.tipoComida = event.detail.value;
  }
  /**
   *  Método que funciona para volver al tab4 (el anterior).
   */
  salirSinArgumentos() {
    this.router.navigateByUrl("nutrition/tab-comida");
  }
  /**
   * Método salirConArgumentos verifica que los datos a envíar no son vacíos,
   * los prepara en un objeto y los envía mendiante el servicio putDailyRecordsMeal
   * junto con el ID del dailyRecord del paciente.
   */
  salirConArgumentos() {
    // If para comprobar si los datos están vacíos, no permitir que los datos
    // sean enviados.
    if (this.cantidadComida === null || this.cantidadComida === undefined) {
      this.presentToast('"¿Cuánto comió?" Faltante');
      return;
    } else if (this.tipoComida === null || this.tipoComida === undefined) {
      this.presentToast('"Tipo de comida" Faltante');
      return;
    }
    // En caso que todos los datos tengan valor, prepara los datos para
    // ser envíados.
    let data = {
      quantity: this.cantidadComida,
      foodType: this.tipoComida,
      independence: this.rangeIndependencia,
      functional: this.rangeCubiertos,
      chewingPerformance: this.rangeDisfagia,
    };

    // Envía al servicio el objeto data y el id del dailyRecord del paciente, si la
    // respuesta es success, muestra el mensaje de alerta y se devuelve al tab de
    // comidas.
    this.dailyService.putDailyRecordsMeal(data, this.paciente._id).subscribe(
      (res) => {
        if (res.success === true) {
          mostrarAlertaConfirmacion("Datos enviados correctamente.");
          this.router.navigateByUrl("nutrition/tab-comida");
          this.nutritionService.sendClickEvent();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   *  Muestra un mensaje de error cuando faltan datos por llenar
   *  en la página.
   *  @param message mensaje que mostrará la alerta.
   */
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
    });
    toast.present();
  }
}
