import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HygieneModalPageRoutingModule } from './hygiene-modal-routing.module';

import { HygieneModalPage } from './hygiene-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HygieneModalPageRoutingModule
  ],
  declarations: [HygieneModalPage]
})
export class HygieneModalPageModule {}
