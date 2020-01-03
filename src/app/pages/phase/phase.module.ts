import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhasePageRoutingModule } from './phase-routing.module';

import { PhasePage } from './phase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhasePageRoutingModule
  ],
  declarations: [PhasePage]
})
export class PhasePageModule {}
