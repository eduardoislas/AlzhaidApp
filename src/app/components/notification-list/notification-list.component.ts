import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Subscription } from "rxjs";
import { NotificationsListenerService } from "src/app/services/notifications/notificationsListener.service";
import { CaregiverService } from "src/app/services/caregiver.service";

@Component({
  selector: "app-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.scss"],
})
export class NotificationListComponent implements OnInit {
  clickEventsubscription: Subscription;
  notifications: any = [];
  rol: string;
  filtradas: any = [];
  paciente;
  ocultas = false;
  textoBoton = "Ver notificaciones ocultas";
  coordinador = 'false';

  constructor(
    private notificationsService: NotificationsService,
    private caregiverService: CaregiverService,
    private storage: Storage,
    private router: Router,
    private notificationsListenerService: NotificationsListenerService
  ) {
    this.clickEventsubscription = this.notificationsListenerService
      .getClickEvent()
      .subscribe(() => {
        this.cargarLista();
      });

    this.storage.get("UsuarioCoordinador").then((res) => {
      this.coordinador = res;
      console.log(this.coordinador);
    });
  }

  ngOnInit() {
    this.cargarLista();
  }

  async openComponent() {
    this.router.navigateByUrl(`notifications-add`);
  }

  async openIncidenceComponent() {
    this.router.navigateByUrl(`incidence-add`);
  }

  async ocultarNotificacion(notificationID) {
    let usuarioID;

    this.storage.get("id").then((res) => {
      usuarioID = res;

      if (this.textoBoton == "Ver notificaciones ocultas") {
        this.notificationsService
          .putNotificationUnsuscribe(notificationID, usuarioID)
          .subscribe(
            (res) => {
              if (res.success === true) {
                this.cargarLista();
              }
            },
            (err) => {
              console.log("error", err);
            }
          );
      } else {
        this.notificationsService
          .putNotificationSuscribe(notificationID, usuarioID)
          .subscribe(
            (res) => {
              if (res.success === true) {
                this.cargarLista();
              }
            },
            (err) => {
              console.log("error", err);
            }
          );
      }
    });
  }

  notificacionesOcultas() {
    if (this.textoBoton == "Ver notificaciones ocultas") {
      this.ocultas = true;
      this.textoBoton = "Regresar";
    } else {
      this.ocultas = false;
      this.textoBoton = "Ver notificaciones ocultas";
    }
    this.cargarLista();
  }

  cargarLista() {
    this.storage.get("Rol").then((res) => {
      this.rol = res;
      this.notifications = [];

      if (this.rol === "FAMILIAR") {
        //Si el rol del usuario es familiar, tiene acceso a su paciente vinculado
        let userID;

        this.storage.get("id").then((res) => {
          userID = res;

          this.caregiverService
            .getCaregiverByUserID(userID)
            .subscribe((resCaregiver) => {
              this.paciente = resCaregiver.caregiver[0].patient;

              this.notificationsService.getNotifications().subscribe((res) => {
                res.vigentes.forEach((nota) => {
                  if (
                    nota.area.includes(this.rol) &&
                    nota.patient._id == this.paciente._id
                  ) {
                    // nuevo pq iba arriba
                    if (
                      this.ocultas == false &&
                      nota.unsubscribedUsers.find(
                        (element) => element == userID
                      ) == undefined
                    ) {
                      this.notifications.push(nota);
                    } else {
                      if (
                        this.ocultas == true &&
                        nota.unsubscribedUsers.find(
                          (element) => element == userID
                        ) != undefined
                      ) {
                        this.notifications.push(nota);
                      }
                    }
                  }
                });
              });
            });
        });
      } else {
        let userID;

        this.storage.get("id").then((res) => {
          userID = res;

          this.notificationsService.getNotifications().subscribe((res) => {
            res.vigentes.forEach((nota) => {
              if (nota.area.includes(this.rol)) {
                if (
                  this.ocultas == false &&
                  nota.unsubscribedUsers.find((element) => element == userID) ==
                    undefined
                ) {
                  this.notifications.push(nota);
                } else {
                  if (
                    this.ocultas == true &&
                    nota.unsubscribedUsers.find(
                      (element) => element == userID
                    ) != undefined
                  ) {
                    this.notifications.push(nota);
                  }
                }
              }
            });
          });
        });
      }
    });
  }
}
