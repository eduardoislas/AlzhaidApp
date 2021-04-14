import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { NotFoundMessageComponent } from './not-found-message/not-found-message.component';
import { PatientNotFoundMessageComponent } from './patient-not-found-message/patient-not-found-message.component';
import { HidenNotificationListComponent } from './hiden-notification-list/hiden-notification-list.component';

@NgModule({
  declarations: [
    SearchbarComponent,
    NotificationListComponent,
    ModalComponent,
    NotFoundMessageComponent,
    PatientNotFoundMessageComponent,
    HidenNotificationListComponent
  ],
  exports: [
    SearchbarComponent,
    NotificationListComponent,
    ModalComponent,
    NotFoundMessageComponent,
    PatientNotFoundMessageComponent,
    HidenNotificationListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
