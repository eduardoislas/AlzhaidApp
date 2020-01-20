import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationsAddPageRoutingModule } from './notifications-add-routing.module';
import { NotificationsAddPage } from './notifications-add.page';
import { ComponentsModule } from '../../components/components.module';
import { PacientListModalPage } from '../../modals/pacient-list-modal/pacient-list-modal.page';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsAddPageRoutingModule,
  ],
  declarations: [NotificationsAddPage, PacientListModalPage],
  entryComponents: [PacientListModalPage]
})
export class NotificationsAddPageModule {}
