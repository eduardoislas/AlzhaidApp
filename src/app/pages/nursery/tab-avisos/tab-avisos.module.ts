import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAvisosPageRoutingModule } from './tab-avisos-routing.module';
import { ComponentsModule } from '../../../components/components.module';
import { TabAvisosPage } from './tab-avisos.page';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TabAvisosPageRoutingModule
  ],
  declarations: [TabAvisosPage]
})
export class TabAvisosPageModule {}
