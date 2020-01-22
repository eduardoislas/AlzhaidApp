import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { Tab2Page } from './tab2.page';
import { PhaseModalActividadesPage } from '../phase-modal-actividades/phase-modal-actividades.page';
import { PhaseModalActividadesPageModule } from '../phase-modal-actividades/phase-modal-actividades.module';

@NgModule({
  entryComponents: [
    PhaseModalActividadesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2PageRoutingModule,
    PhaseModalActividadesPageModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
