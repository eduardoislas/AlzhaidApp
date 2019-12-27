import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientListModalPageRoutingModule } from './pacient-list-modal-routing.module';

import { PacientListModalPage } from './pacient-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientListModalPageRoutingModule
  ],
  declarations: [PacientListModalPage],
   exports: [PacientListModalPage]
})
export class PacientListModalPageModule {}
