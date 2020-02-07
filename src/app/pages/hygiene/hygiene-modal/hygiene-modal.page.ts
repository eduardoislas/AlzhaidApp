import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PatientsService } from 'src/app/services/patients.service';
import { DailyRecordService } from 'src/app/services/daily-record.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hygiene-modal',
  templateUrl: './hygiene-modal.page.html',
  styleUrls: ['./hygiene-modal.page.scss'],
})
export class HygieneModalPage implements OnInit {

  @Input() paciente;

  diagnosticoPaciente = [];
  limitacionesFisicas = [];
  ReportHygiene = [];
  toggleMiccion = false;
  toggleEvacuacion = false;
  toggleCambio = false;
  toggleEstrenimiento = false;
  toggleBano = false;
  toggleProtector = false;
  time = 'Mañana';
  observacionMiccion = '';
  observacionEvacuacion = '';
  observacionCRopa = '';
  observacionEstrenimiento = '';
  observacionBano = '';
  observacionProtector = '';
  i = 0;

  constructor(private modalCtrl: ModalController,
              private patientService: PatientsService,
              private dailyRecordService: DailyRecordService) {}

  ngOnInit() {
    const id = this.paciente.patient._id;
    this.patientService.getPatientId(id).subscribe(res => {
      res.patient.diagnosis.forEach(e => {
        this.diagnosticoPaciente.push(e);
      });
      res.patient.physicalLimitations.forEach(e => {
        this.limitacionesFisicas.push(e);
      });
    }, err => {
      console.log(err);
    });
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  /** Verifica que la opcion fue seleccionada, si lo fue a los datos (nombre, time,
   * observacion... ) de la opcion se agregan al arreglo. Envia un arreglos unicamente
   * de objetos seleccionados en hygiene-modal.page
   */
  salirConArgumentos() {
    let data;
    const higiene = [];
    if (this.toggleMiccion) {
      data = {
        name: 'Micción',
        time: this.time,
        observation: this.observacionMiccion
      };
      higiene.push(data);
    }
    if (this.toggleEvacuacion) {
      data = {
        name: 'Evacuación',
        time: this.time,
        observation: this.observacionEvacuacion
      };
      higiene.push(data);
    }
    if (this.toggleCambio) {
      data = {
        name: 'Cambio de ropa',
        time: this.time,
        observation: this.observacionCRopa
      };
      higiene.push(data);
    }
    if (this.toggleEstrenimiento) {
      data = {
        name: 'Estreñimiento',
        time: this.time,
        observation: this.observacionEstrenimiento
      };
      higiene.push(data);
    }
    if (this.toggleBano) {
      data = {
        name: 'Baño',
        time: this.time,
        observation: this.observacionBano
      };
      higiene.push(data);
    }
    if (this.toggleProtector) {
      data = {
        name: 'Cambio de protectores',
        time: this.time,
        observation: this.observacionProtector
      };
      higiene.push(data);
    }

    // Llamar el método del servicio
    this.dailyRecordService.putDailyRecordsHygiene(this.paciente._id, higiene)
    .subscribe(res => {
      this.disparaAlert('Reporte de higiene registrado');
      this.modalCtrl.dismiss();
    });
  }

  /** Cambia el valor de time dependiendo de que valor tenga el evento */
  timeChanged( event ) {
    this.time = event.detail.value;
  }

  /** Cambia el valor observacionMiccion */
  observationMiccion( event ) {
    this.observacionMiccion = event.target.value;
  }
  /** Cambia el valor observacionEvacuacion */
  observationEvacuacion( event ) {
    this.observacionEvacuacion = event.target.value;
  }
  /** Cambia el valor observacionIncontinencia */
  observationIncontinencia( event ) {
    this.observacionCRopa = event.target.value;
  }
  /** Cambia el valor observacionEstrenimiento */
  observationEstrenimiento( event ) {
    this.observacionEstrenimiento = event.target.value;
  }
  /** Cambia el valor observacionBano */
  observationBano( event ) {
    this.observacionBano = event.target.value;
  }
  /** Cambia el valor observacionProtector */
  observationProtector( event ) {
    this.observacionProtector = event.target.value;
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
