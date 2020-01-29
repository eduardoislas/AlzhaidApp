import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBitacoraPageRoutingModule } from './modal-bitacora-routing.module';

import { ModalBitacoraPage } from './modal-bitacora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBitacoraPageRoutingModule
  ],
  declarations: [ModalBitacoraPage]
})
export class ModalBitacoraPageModule {}
