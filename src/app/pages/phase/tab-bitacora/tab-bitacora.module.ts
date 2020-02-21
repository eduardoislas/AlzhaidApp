import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabBitacoraPageRoutingModule } from './tab-bitacora-routing.module';

import { TabBitacoraPage } from './tab-bitacora.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabBitacoraPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [TabBitacoraPage]
})
export class TabBitacoraPageModule {}
