import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonRange } from '@ionic/angular';

@Component({
  selector: 'app-phase-modal',
  templateUrl: './phase-modal.page.html',
  styleUrls: ['./phase-modal.page.scss'],
})
export class PhaseModalPage implements OnInit {
  @ViewChild(IonRange, {static: true}) iRange: IonRange;
  
  @Input() paciente;
  @Input() tipoBitacora;

  opcionSeleccionada;
  crisisSeleccionada;
  valorRange;

  toggleConducta = true;

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
    console.log(this.tipoBitacora);
  }

  segmentChangedRange( event ) {
    this.valorRange = event.detail.value;
    console.log(this.valorRange);
  }
  radioGroupChange( event ) {
    this.opcionSeleccionada = event.detail.value;
    console.log(this.opcionSeleccionada);
  }
  radioGroup( event ) {
    this.crisisSeleccionada = event.detail.value;
    console.log(this.crisisSeleccionada);
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }
  salirConArgumentos() {
    this.modalCtrl.dismiss();
  }
}
