import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabActivacionPageRoutingModule } from './tab-activacion-routing.module';

import { TabActivacionPage } from './tab-activacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabActivacionPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [TabActivacionPage]
})
export class TabActivacionPageModule { }
