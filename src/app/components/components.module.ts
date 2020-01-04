import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsShowComponent } from './notifications-show/notifications-show.component';
import { IonicModule } from "@ionic/angular";



@NgModule({
  declarations: [
    // Anexar los componentes creados
    NotificationsShowComponent
  ],
  exports: [
    // Anexar los componentes creados
    NotificationsShowComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class ComponentsModule { }
