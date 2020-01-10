import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { IonicModule } from "@ionic/angular";
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    SearchbarComponent,
    NotificationListComponent,
    ModalComponent
  ],
  exports: [
    SearchbarComponent,
    NotificationListComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
