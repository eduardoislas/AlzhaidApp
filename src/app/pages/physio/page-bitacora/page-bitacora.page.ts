import { Component, OnInit, Input } from '@angular/core';
import { Catalog } from 'src/app/interfaces/catalogs';
import { CatalogService } from 'src/app/services/catalog.service';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-bitacora',
  templateUrl: './page-bitacora.page.html',
  styleUrls: ['./page-bitacora.page.scss'],
})
export class PageBitacoraPage implements OnInit {
  paciente;

  estadoAntes;
  estadoDespues;

  actividades: Catalog[] = [];

  humorAntes;
  humorDespues;

  today = new Date().toISOString();

  horaInicio = this.today;
  horaFin = this.today;

  constructor(
    private catalogService: CatalogService,
    private dailyService: DailyRecordService,
    private router: Router) { }

  ngOnInit() {
    this.paciente = history.state.data;
    this.getCatalogsType();
  }

  /*
    Método que obtiene los catálogos de actividades, se filtran los
    de fisioterapia, se les agrega un campo selected y score y finalmente
    se agregan al arreglo de actividades.
  */
  getCatalogsType() {
    this.catalogService.getCatalogsType('actividad').subscribe(res => {
      res.catalogs.forEach(element => {
        if (element.classification === 'Fisioterapia') {
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
    this.router.navigateByUrl('physio/tab-bitacora');
  }

  /*
    Método que recorre las habilidades de fisioterapia, selecciona
    las cuales fueron seleccionadas y asignadas con un score y las
    mete en el arreglo de actividades seleccionadas a modo de objeto.
    Los switch son para cambiar el valor de los humores según el que
    fue seleccionado, prepara la información y la envía en el servicio.
  */
  salirConArgumentos() {
    let actividadesSeleccionadas = [];

    this.actividades.forEach(element => {
      if (element.selected === true) {
        actividadesSeleccionadas.push({
          name: element.name,
          classification: element.classification,
          performance: element.score
        });
      }
    });
    switch (this.humorAntes) {
      case 'negativo':
        this.humorAntes = 1;
        break;
      case 'neutral':
        this.humorAntes = 2;
        break;
      case 'positivo':
        this.humorAntes = 3;
        break;
    }
    switch (this.humorDespues) {
      case 'negativo':
        this.humorDespues = 1;
        break;
      case 'neutral':
        this.humorDespues = 2;
        break;
      case 'positivo':
        this.humorDespues = 3;
        break;
    }
    let data = {
      startMood: this.humorAntes,
      endMood: this.humorDespues,
      startTime: this.horaInicio,
      endTime: this.horaFin,
      activities: actividadesSeleccionadas
    }
    console.log(data);

    this.dailyService.putDailyRecordsPhysio(this.paciente._id, data).subscribe(res => {
      if (res.success === true) {
        this.disparaAlert('Datos enviados correctamente');
        this.router.navigateByUrl('physio/tab-bitacora');
      }
    }, err => {
      console.log(err);
    });
  }

  /**
  * Muestra un mensaje de alerta con una confirmacion
  * @param title mensaje que mostrara la alerta
  */
  disparaAlert(title: string) {
    // SweetAlert
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'success',
      title
    });
  }

}
