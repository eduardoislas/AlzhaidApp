import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications-show',
  templateUrl: './notifications-show.page.html',
  styleUrls: ['./notifications-show.page.scss'],
})
export class NotificationsShowPage implements OnInit {
today = Date.now();
  constructor() { 
     
  }

  ngOnInit() {
  }

}
