import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nursery-modal',
  templateUrl: './nursery-modal.page.html',
  styleUrls: ['./nursery-modal.page.scss'],
})
export class NurseryModalPage implements OnInit {
  @Input() paciente;

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() { }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }
  salirConArgumentos() {
    this.modalCtrl.dismiss({
      nombre: 'Juan',
      pais: 'España'
    });
  }
}
