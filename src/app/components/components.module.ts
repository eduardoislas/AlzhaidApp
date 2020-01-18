import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsShowComponent } from './notifications-show/notifications-show.component';
import { IonicModule } from "@ionic/angular";

import { SearchBarComponent } from './search-bar/search-bar.component';




@NgModule({
  declarations: [
    SearchBarComponent,
    NotificationsShowComponent
  ],
  exports: [
    SearchBarComponent,
    NotificationsShowComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class ComponentsModule { }
