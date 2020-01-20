import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhaseModalActividadesPageRoutingModule } from './phase-modal-actividades-routing.module';

import { PhaseModalActividadesPage } from './phase-modal-actividades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhaseModalActividadesPageRoutingModule
  ],
  declarations: [PhaseModalActividadesPage]
})
export class PhaseModalActividadesPageModule {}
