import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NurseryModalPageRoutingModule } from './nursery-modal-routing.module';

import { NurseryModalPage } from './nursery-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseryModalPageRoutingModule
  ],
  declarations: [NurseryModalPage]
})
export class NurseryModalPageModule {}
