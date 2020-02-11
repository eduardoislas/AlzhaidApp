import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComidaModalPageRoutingModule } from './comida-modal-routing.module';

import { ComidaModalPage } from './comida-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComidaModalPageRoutingModule
  ],
  declarations: [ComidaModalPage]
})
export class ComidaModalPageModule {}
