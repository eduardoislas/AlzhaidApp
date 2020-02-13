import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../../services/notifications.service';
import { ModalController } from '@ionic/angular';
import { NotificationsAddPage } from '../notifications-add/notifications-add.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
notifications: any = [];
rol: string;
filtradas: any = [];

  constructor(private modalCtrl: ModalController, private NotificationsService: NotificationsService, private storage: Storage) {}
  
  ngOnInit() {
    this.cargarLista()
    this.storage.get('Rol').then((val) => {
      this.rol = val;
    });
    // this.filtrarLista()
  }

    async openModal() {
      const modal = await this.modalCtrl.create({
        component: NotificationsAddPage,
        componentProps: {

        }
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      this.cargarLista()
      
    }
  
    cargarLista(){
      this.NotificationsService.getNotifications().subscribe(res => {
        this.notifications.push(res.vigentes);
        this.notifications = res.vigentes;
      });
    }

    // filtrarLista(){
    //   for (let x in this.notifications){
    //     for (let a in x.area){
    //       if (a === this.rol){
    //         this.filtradas.push(x);
    //       }
    //     }
    //   }
    // }
}
