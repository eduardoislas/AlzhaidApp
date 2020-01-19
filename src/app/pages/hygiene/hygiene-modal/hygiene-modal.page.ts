import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hygiene-modal',
  templateUrl: './hygiene-modal.page.html',
  styleUrls: ['./hygiene-modal.page.scss'],
})
export class HygieneModalPage implements OnInit {

  @Input() paciente;
  constructor(private modalCtrl: ModalController ) {}

  ngOnInit() {}

  salirSinArgumentos() {
    console.log('sin args');
    this.modalCtrl.dismiss();
    
  }
  salirConArgumentos() {
    console.log('con args');
    this.modalCtrl.dismiss();
  }
}
