import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsAddPageRoutingModule } from './notifications-add-routing.module';

import { NotificationsAddPage } from './notifications-add.page';
import { HygienePageModule } from '../../pages/hygiene/hygiene.module';
import { NotificationsShowComponentModule } from '../notifications-show/notifications-show.module';
import { UserListPageModule } from '../user-list/user-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsAddPageRoutingModule,
    UserListPageModule
  ],
  declarations: [NotificationsAddPage]
})
export class NotificationsAddPageModule {}
