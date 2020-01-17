import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhaseModalPageRoutingModule } from './phase-modal-routing.module';

import { PhaseModalPage } from './phase-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhaseModalPageRoutingModule
  ],
  declarations: [PhaseModalPage]
})
export class PhaseModalPageModule {}
