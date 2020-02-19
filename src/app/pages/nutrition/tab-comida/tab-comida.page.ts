import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab-comida.page.html',
  styleUrls: ['./tab-comida.page.scss'],
})
export class TabComidaPage implements OnInit {
  rutaActual = this.router.url;
  pacientes = [];

  constructor(private dailyService: DailyRecordService,
    private router: Router) { }

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
    this.router.navigateByUrl( `${this.rutaActual}/page-comida`, {state: {data: paciente}} );
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
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title
    });
  }

}
