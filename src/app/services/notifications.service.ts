import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RootNotification} from '../interfaces/notifications';


const url = 'http://alzaid.herokuapp.com/notification/';
<<<<<<< HEAD
=======


>>>>>>> dc0f53f44d8bbb04e4149cc8b3cd8acc0c31f4e2

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
