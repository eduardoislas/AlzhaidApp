import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../../services/notifications.service';
import { Vigente } from '../../interfaces/notifications';
import { ModalController } from '@ionic/angular';
import { NotificationsAddPage } from '../notifications-add/notifications-add.page';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
notifications: any = [];

  constructor(private modalCtrl: ModalController, private NotificationsService: NotificationsService) {}
  
  ngOnInit() {
    this.cargarLista()
    
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

}
