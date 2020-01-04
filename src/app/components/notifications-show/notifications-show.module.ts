import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsShowComponent } from './notifications-show.component';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule,],
  declarations: [NotificationsShowComponent],
  exports: [NotificationsShowComponent]
})
export class NotificationsShowComponentModule {}
