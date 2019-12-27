import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsShowPageRoutingModule } from './notifications-show-routing.module';

import { NotificationsShowPage } from './notifications-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsShowPageRoutingModule
  ],
  declarations: [NotificationsShowPage]
})
export class NotificationsShowPageModule {}
