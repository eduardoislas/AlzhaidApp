import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RootNotification} from '../interfaces/notifications';


const url = 'http://alzaid.herokuapp.com/notification/';
// const url = 'http://192.168.0.12:3000//notification/';




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
