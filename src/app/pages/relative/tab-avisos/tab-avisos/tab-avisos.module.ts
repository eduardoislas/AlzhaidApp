import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAvisosPageRoutingModule } from './tab-avisos-routing.module';

import { TabAvisosPage } from './tab-avisos.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAvisosPageRoutingModule,
    ComponentsModule // Para poder usar los componentes
  ],
  declarations: [TabAvisosPage]
})
export class TabAvisosPageModule {}
