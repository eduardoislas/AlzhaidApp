import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PacientListModalPage } from '../../modals/pacient-list-modal/pacient-list-modal.page';

@Component({
  selector: 'app-assistance-show',
  templateUrl: './assistance-show.page.html',
  styleUrls: ['./assistance-show.page.scss'],
})
export class AssistanceShowPage implements OnInit {

  constructor(private modalController: ModalController) { }

  async openModal(){
    const modal =await this.modalController.create({
      component: PacientListModalPage
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
