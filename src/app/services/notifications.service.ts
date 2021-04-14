import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootNotification } from '../interfaces/notifications';

const url = 'http://localhost:3000/notification';
//const url = 'https://alzaid.herokuapp.com/notification';
// const url = 'http://74.208.247.106:3000/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private http: HttpClient) { }

  /**
   * Obtener todas las notificaciones.
   */
  getNotifications() {
    return this.http.get<RootNotification>(`${url}`);
  }

  /**
   * Obtener notificaciones por rol.
   * @param role 
   */
  getNotificationsByRole(role: string) {
    return this.http.get(`${url}/${role}`);
  }

  /**
   * Obtener notificaciones por rol.
   * @param notification 
   */
  postNotifications(notification: any) {
    return this.http.post(`${url}`, { notification });
  }

  /**
   * Método PUT que desuscribe un usuario a una notificación.
   * @param id 
   * @returns 
   */
   putNotificationUnsuscribe(id: string, unsubscribedUser){
    return this.http.put<RootNotification>(`${url}/unsubscribe/${id}`,{
      unsubscribedUser
    });
  }

  /**
   * Método PUT que suscribe un usuario a una notificación.
   * @param id 
   * @returns 
   */
  putNotificationSuscribe(id: string, subscribedUser){
    return this.http.put<RootNotification>(`${url}/subscribe/${id}`,{
      subscribedUser
    });
  }
}
