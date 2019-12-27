import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PacientListModalPage } from '../../modals/pacient-list-modal/pacient-list-modal.page';

@Component({
  selector: 'app-notifications-add',
  templateUrl: './notifications-add.page.html',
  styleUrls: ['./notifications-add.page.scss'],
})
export class NotificationsAddPage implements OnInit {

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
