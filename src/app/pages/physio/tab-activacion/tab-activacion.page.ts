import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';
import { element } from 'protractor';
import { PageComidaPageRoutingModule } from '../../nutrition/page-comida/page-comida-routing.module';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab-activacion.page.html',
  styleUrls: ['./tab-activacion.page.scss'],
})
export class TabActivacionPage implements OnInit {
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  }

  //infoEnviada = false; // true o false

  pacientes = [];

  opcion;

  constructor(private dailyService: DailyRecordService) { }

  ngOnInit() {
    this.opcion = 'reporte';
    this.getDailyRecords();
  }

  segmentChangedRegistros(event) {
    this.opcion = event.detail.value;

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

  validarSobreescritura(paciente){
    console.log(paciente.selected);

    if(paciente.selected === false || paciente.selected === undefined){
      if(paciente.physicalActivation != undefined){
        this.mostrarAlerta("Ya existe registro del paciente");
      }
    }
  }

  sendData() {
    let activation = [];

    this.pacientes.forEach(element => {
      if (element.score === undefined) element.score = 0;

      if (element.selected === true) {
        activation.push({
          id: element._id,
          performance: element.score
        });
      } /*else {
        activation.push({
          id: element._id,
          performance: 5
        });
      }*/
    });

    console.log(activation);

    // Por hacer: Enviar notificación de confirmación y deshabilitar el envío de otra actualización de datos de activación
    this.dailyService.putDailyRecordsPhysicalActivation(activation).subscribe(res => {
      if (res.success === true) {
        //this.infoEnviada = true;
        this.disparaAlert('Datos enviados correctamente.');
        this.getDailyRecords();

        console.log('respuesta', res);

      }
    }, err => {
      console.log('error', err);
    });
  }

  sendMassiveData() {
    // arreglo a ser llenado.
    let activation = [];

    // Por cada paciente, prepara el objeto con su ID de dailyRecord y un performance 5.
    this.pacientes.forEach(element => {
      activation.push({
        id: element._id,
        performance: 5
      });
    });

    console.log(activation);

    // Envía a través del servicio el arreglo activation, el cual fue llenado previamente.
    this.dailyService.putDailyRecordsPhysicalActivation(activation).subscribe(res => {
      // Si la respuesta del servicio es true, dispara el sweetAlert y cambia la variable
      // infoEnviada a true.
      if (res.success === true) {
        this.disparaAlert('Datos enviados correctamente.');
        this.getDailyRecords();
        //this.infoEnviada = true;
      }
    }, err => {
      console.log(err);
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

  mostrarAlerta(title: string) {
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
      icon: 'warning',
      title
    });
  }


}
