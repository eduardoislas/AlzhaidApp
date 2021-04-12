import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { NotificationsListenerService } from 'src/app/services/notifications/notificationsListener.service';
import { CaregiverService } from 'src/app/services/caregiver.service';

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
  paciente;


  constructor(
    private notificationsService: NotificationsService,
    private caregiverService: CaregiverService,
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
  }

  async openComponent() {
    this.router.navigateByUrl(`notifications-add`,);
  }

  cargarLista() {
    this.storage.get('Rol').then((res) => {
      this.rol = res;
      this.notifications = [];

      if (this.rol === 'FAMILIAR') {//Si el rol del usuario es familiar, tiene acceso a su paciente vinculado
        let userID;

        this.storage.get("id").then((res) => {
          userID = res;
          console.log(userID);

          this.caregiverService.getCaregiverByUserID(userID).subscribe((resCaregiver) => {
            this.paciente = resCaregiver.caregiver[0].patient;

            this.notificationsService.getNotifications().subscribe(res => {
              res.vigentes.forEach(nota => {
                if (nota.area.includes(this.rol) && nota.patient._id == this.paciente._id) {
                  this.notifications.push(nota);
                  console.log('Sí estuvo en el area y el paciente coincide');
                }
              });
              console.log(this.notifications);
            });

          });
        });

      } else {

        this.notificationsService.getNotifications().subscribe(res => {
          res.vigentes.forEach(nota => {
            if (nota.area.includes(this.rol)) {
              this.notifications.push(nota);
              console.log('Sí estuvo en el area');
            }
          });
          console.log(this.notifications);
        });

      }

    });

  }


}
