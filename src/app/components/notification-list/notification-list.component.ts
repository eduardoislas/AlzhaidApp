import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../../services/notifications.service';
import { Router } from '@angular/router';
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


  constructor(private NotificationsService: NotificationsService,
              private storage: Storage,
              private router: Router) {}

  ngOnInit() {
    this.cargarLista();
    this.storage.get('Rol').then((val) => {
      this.rol = val;
    });
    // this.filtrarLista()
  }

    async openComponent() {
      this.router.navigateByUrl(`notifications-add`, );
    }

    cargarLista() {
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
