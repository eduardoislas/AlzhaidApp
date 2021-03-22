import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { NotificationsListenerService } from 'src/app/services/notifications/notificationsListener.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  clickEventsubscription: Subscription;
  notifications: any = [];
  rol: string;
  filtradas: any = [];


  constructor(
    private notificationsService: NotificationsService,
    private storage: Storage,
    private router: Router,
    private notificationsListenerService: NotificationsListenerService) {
    this.clickEventsubscription = this.notificationsListenerService
      .getClickEvent()
      .subscribe(() => {
        this.cargarLista();
      });
  }

  ngOnInit() {
    this.cargarLista();
    this.storage.get('Rol').then((val) => {
      this.rol = val;
    });
    // this.filtrarLista()
  }

  async openComponent() {
    this.router.navigateByUrl(`notifications-add`,);
  }

  cargarLista() {
    const filtado = [];
    this.notificationsService.getNotifications().subscribe(res => {
      console.log(this.rol);
      console.log(res);
      res.vigentes.forEach(nota => {
        if (nota.area.includes(this.rol)) {
          filtado.push(nota);
        }
      });
      this.notifications.push(filtado);
      this.notifications = filtado;
      console.log(filtado);
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
