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
  salirConArgumentos() {
    console.log('con args');
    this.modalCtrl.dismiss();
  }
}
