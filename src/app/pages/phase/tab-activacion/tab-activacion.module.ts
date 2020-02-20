import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabActivacionPageRoutingModule } from './tab-activacion-routing.module';

import { TabActivacionPage } from './tab-activacion.page';
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
    TabActivacionPageRoutingModule,
    PhaseModalActividadesPageModule
  ],
  declarations: [TabActivacionPage]
})
export class TabActivacionPageModule {}
