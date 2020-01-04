import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { IonicModule } from "@ionic/angular";


@NgModule({
  declarations: [
    SearchbarComponent,
    NotificationListComponent
  ],
  exports: [
    SearchbarComponent,
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
