import { Component, OnInit } from '@angular/core';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';
import { ModalController } from '@ionic/angular';
import { ComidaModalPage } from '../comida-modal/comida-modal.page';

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

  opcionDesempeno;

  constructor(private dailyService: DailyRecordService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  segmentChangedDesempeno(event) {
    this.opcionDesempeno = event.detail.value;
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

  sendDataDesempeno() {
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
    
    this.dailyService.putDailyRecordsCollation(activation).subscribe(res => {
      if(res.success === true) {
        this.disparaAlert('Datos enviados correctamente.');
        this.infoEnviada = true;
      }
    }, err => {
      console.log(err);
    });

  }

  sendMassiveData() {
    let activation = [];

    this.pacientes.forEach(element => {
      activation.push({
        id: element._id,
        performance: 5
      });
    });
    
    this.dailyService.putDailyRecordsCollation(activation).subscribe(res => {
      if(res.success === true) {
        this.disparaAlert('Datos enviados correctamente.');
        this.infoEnviada = true;
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
