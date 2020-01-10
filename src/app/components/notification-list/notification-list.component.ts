import { Component, OnInit } from '@angular/core';
import {NotificationsService} from "../../services/notifications.service"

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
notifications = [];

  constructor(private NotificationsService: NotificationsService) { 
  }
  
  ngOnInit() {
    this.NotificationsService.getNotifications().subscribe(res => {
      console.log(res.vigentes);
      this.notifications.push(res.vigentes);
    });
    }

}