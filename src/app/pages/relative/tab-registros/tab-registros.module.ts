import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabRegistrosPageRoutingModule } from './tab-registros-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { TabRegistrosPage } from './tab-registros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRegistrosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabRegistrosPage]
})
export class TabRegistrosPageModule {}
