import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PatientsService } from 'src/app/services/patients.service';

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
  time = 'mañana';
  observacionMiccion = '';
  observacionEvacuacion = '';
  observacionIncontinencia = '';
  observacionEstrenimiento = '';
  observacionBano = '';
  observacionProtector = '';

  constructor(private modalCtrl: ModalController,
              private patientService: PatientsService) {}

  ngOnInit() {
    const id = this.paciente.patient._id;
    this.patientService.getPatientId(id).subscribe(res => {
      console.log(res);
      res.patient.diagnosis.forEach(e => {
        this.diagnosticoPaciente.push(e);
      });
      res.patient.physicalLimitations.forEach(e => {
        this.limitacionesFisicas.push(e);
      });
      console.log(this.diagnosticoPaciente);
    }, err => {
      console.log(err);
    });
  }

  salirSinArgumentos() {
    console.log('sin args');
    this.modalCtrl.dismiss();
  }

  /** Envia un arreglos unicamente de objetos seleccionados en hygiene-modal.page */
  salirConArgumentos() {
    console.log('con args');
    const data = [];
    if (this.toggleMiccion) {
      data[0] = {
        name: 'Micción',
        time: this.time,
        observation: this.observacionMiccion
      };
    }
    if (this.toggleEvacuacion) {
      data[1] = {
        name: 'Evacuación',
        time: this.time,
        observation: this.observacionMiccion
      };
    }
    if (this.toggleCambio) {
      data[2] = {
        name: 'Cambio de ropa',
        time: this.time,
        observation: this.observacionMiccion
      };
    }
    if (this.toggleEstrenimiento) {
      data[3] = {
        name: 'Estreñimiento',
        time: this.time,
        observation: this.observacionMiccion
      };
    }
    if (this.toggleBano) {
      data[4] = {
        name: 'Baño',
        time: this.time,
        observation: this.observacionMiccion
      };
    }
    if (this.toggleProtector) {
      data[5] = {
        name: 'Cambio de protectores',
        time: this.time,
        observation: this.observacionMiccion
      };
    }
    console.log(data);
  }

  /** Cambia el valor de time dependiendo de que valor tenga el evento */
  timeChanged( event ) {
    this.time = event.detail.value;
    console.log(this.time);
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
    this.observacionIncontinencia = event.target.value;
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
}
