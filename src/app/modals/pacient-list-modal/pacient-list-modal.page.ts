import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pacient-list-modal',
  templateUrl: './pacient-list-modal.page.html',
  styleUrls: ['./pacient-list-modal.page.scss'],
})
export class PacientListModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  async closeModal(){
    await this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
