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
  pacientes = []; // arreglo con los pacientes del día.
  opcionDesempeno; // opción seleccionada en el ionSegment.

  constructor(private dailyService: DailyRecordService) { }

  ngOnInit() {
  }

  /**
   * Método segmentChangedDesempeno(event) asigna a la variable opcionDesempeno
   * el valor del ionSegment, obtenido mediante el evento del parametro.
   * @param event evento regresado por el ionSegment.
   */
  segmentChangedDesempeno(event) {
    // Asigna a la variable opcionDesempeno el valor del ionSegment
    this.opcionDesempeno = event.detail.value;
    // Si la variable opcionDesempeno es reporte, busca los dailyRecords del día.
    if(this.opcionDesempeno === 'reporte')  this.getDailyRecords();
  }

  /**
   * Método getDailyRecords() obtiene los dailyRecords del día actual
   * y los mete al arreglo de pacientes.
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
   * Método sendDataDesempeno() busca los pacientes que fueron seleccionados
   * manualmente y agrega al arreglo activación su ID de dailyRecord y su socre
   * del performance. En caso de no ser seleccionado, los agrega igualmente pero
   * con performance 5 por default.
   */
  sendDataDesempeno() {
    // Arreglo donde se guardarán los objetos con el ID del dailyRecord de los
    // pacientes y su performance.
    let activation = [];

    // Se recorre el arreglo de pacientes, el cual fue llenado con el servicio
    // de dailyRecords
    this.pacientes.forEach(element => {
      // Si el paciente ha sido seleccionado
      if (element.selected === true) {
        activation.push({
          id: element._id,
          performance: element.score
        });
        // Si el paciente no ha sido seleccionado.
      } else {
        activation.push({
          id: element._id,
          performance: 5
        });
      }
    });

    // Envía al servicio el arreglo de activación con los objetos previamente llenados.
    this.dailyService.putDailyRecordsCollation(activation).subscribe(res => {
      // Si la respuesta es true, despliega el sweetAlert y convierte la variable
      // infoEnviada en true.
      if (res.success === true) {
        this.disparaAlert('Datos enviados correctamente.');
        this.infoEnviada = true;
      }
    }, err => {
      console.log(err);
    });

  }

  /**
   * Método sendMassivaData() recorre el arreglo de pacientes y por cada uno de ellos
   * prepara un objeto con su ID de dailyRecord y un performance 5 por default, lo
   * mete al arreglo de activation y después son envíados a través del servicio.
   */
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

    // Envía a través del servicio el arreglo activation, el cual fue llenado previamente.
    this.dailyService.putDailyRecordsCollation(activation).subscribe(res => {
      // Si la respuesta del servicio es true, dispara el sweetAlert y cambia la variable
      // infoEnviada a true.
      if (res.success === true) {
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
