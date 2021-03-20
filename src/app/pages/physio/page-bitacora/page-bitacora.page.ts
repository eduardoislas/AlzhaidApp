import { Component, OnInit, Input } from "@angular/core";
import { Catalog } from "src/app/interfaces/catalogs";
import { CatalogService } from "src/app/services/catalog.service";
import { DailyRecordService } from "src/app/services/daily-record.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { RootDaily, PhysioBinnacle, Patient } from '../../../interfaces/daily-records';
import { PhysioService } from '../../../services/physio/physio.service';

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
    private physioService:PhysioService
  ) { }

  ngOnInit() {
    this.today = new Date();
    this.ajustarHora(this.today);
    this.horaInicio = this.today.toISOString();
    this.horaFin = this.today.toISOString();

    this.dailyRecord = history.state.data;
    this.getCatalogsType();
    this.verificarSobreescribirBitacora();
  }

  ajustarHora(fecha: Date){
    fecha.setHours(fecha.getHours() - 7);
  }

  verificarSobreescribirBitacora(){
    if(this.dailyRecord.physioBinnacle.status){ // Si ya tiene un registro en la bitacora de fisioterapia
      console.log("Ya hay Bitácora de fisio");

      if (!Swal.isVisible()) {
        Swal.fire({
          title: 'Ya hay una bitácora',
          text: "¿Desea sobreescribirla?",
          icon: 'warning',
          backdrop: false,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, adelante!'
        }).then((result) => {
          if (!result.value) {
            this.router.navigateByUrl('/physio');
          }
        })
      }
    }else{ 
      console.log("No hay bitacora de fisio");
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
    console.log('HORAS:');
    console.log(this.horaInicio);
    console.log(this.horaFin);
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
      if (this.horaFin >= this.horaInicio) {
        // Si la hora fin es mayor o igual a la de entrada
        let data = {
          startMood: this.humorAntes,
          endMood: this.humorDespues,
          startTime: this.horaInicio,
          endTime: this.horaFin,
          activities: actividadesSeleccionadas,
        };
        console.log(data);

        this.dailyService
          .putDailyRecordsPhysio(this.dailyRecord._id, data)
          .subscribe(
            (res) => {
              if (res.success === true) {
                this.disparaAlert("Datos enviados correctamente");
                this.router.navigateByUrl("physio/tab-bitacora");
                this.physioService.sendClickEvent();

                console.log('HORAS:');
                console.log(this.horaInicio);
                console.log(this.horaFin);
              }
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        // Si la hora fin NO es mayor o igual a la de entrada
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "Horas no válidas",
        });
      }
    } else {
      // Si el registro es vacío no lo guardes y muestra un mensaje de error
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "warning",
        title: "Bitácora vacía",
      });
    }
  }

  /**
   * Muestra un mensaje de alerta con una confirmacion
   * @param title mensaje que mostrara la alerta
   */
  disparaAlert(title: string) {
    // SweetAlert
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title,
    });
  }
}
