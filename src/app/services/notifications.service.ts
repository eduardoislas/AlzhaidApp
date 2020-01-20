import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RootNotification} from '../interfaces/notifications';


const url = 'http://alzaid.herokuapp.com/notification/';
<<<<<<< HEAD
// const url = 'http://192.168.0.12:3000//notification/';

=======
>>>>>>> 255a9071d2fb7441c30713bc880dd0547b0078b6



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  /**
   * Obtener todas las notificaciones
   */
  getNotifications() {
    return this.http.get<RootNotification>(url);
  }

  /**
   * Obtener notificaciones por rol
   */
  getNotificationsByRole(role: string) {
    return this.http.get(url + '/' + role);
  }
}
