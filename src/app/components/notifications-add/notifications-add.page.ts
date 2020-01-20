import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserListPage } from '../user-list/user-list.page';



@Component({
  selector: 'app-notifications-add',
  templateUrl: './notifications-add.page.html',
  styleUrls: ['./notifications-add.page.scss'],
})
export class NotificationsAddPage implements OnInit {

  tipo = '';
  area = '';
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: UserListPage,
      componentProps: {

      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log('Retorno modal', data);
  }

  enviar(){
    this.modalCtrl.dismiss();
  }

  tipoNotificacion( t: string ){
    this.tipo = t;
    console.log(this.tipo);
  }

  establecerArea(a: string){
    this.area = a;
    console.log(this.area);
  }

}
