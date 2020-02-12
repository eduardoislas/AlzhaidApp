import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  }

  infoEnviada = false; // true o false

  pacientes = [];

  opcion;

  constructor( private dailyService: DailyRecordService ) { }

  ngOnInit() {
  }

  segmentChangedRegistros(event) {
    this.opcion = event.detail.value;
    this.getDailyRecords();
  }

  getDailyRecords() {
    this.pacientes = [];
    this.dailyService.getDailyRecordsToday().subscribe(res => {
      res.drs.forEach(element => {
        this.pacientes.push(element);
      });
    });
  }

  rangeChange(event) {
  }

  sendData() {
    let activation = [];

    this.pacientes.forEach(element => {
      if (element.selected === true) {
        activation.push({
          id: element._id,
          performance: element.score
        });
      } else {
        activation.push({
          id: element._id,
          performance: 5
        });
      }
    });

    console.log(activation);

    // Por hacer: Enviar notificación de confirmación y deshabilitar el envío de otra actualización de datos de activación
    this.dailyService.putDailyRecordsPhysicalActivation(activation).subscribe(res => {
      if (res.success === true) {
        this.infoEnviada = true;
        this.disparaAlert('Datos enviados correctamente.')

        console.log('respuesta', res);

      }
    }, err => {
      console.log('error', err);
    });
  }

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
