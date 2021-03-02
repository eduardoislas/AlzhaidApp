import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabColacionPageRoutingModule } from './tab-colacion-routing.module';

import { TabColacionPage } from './tab-colacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabColacionPageRoutingModule,
  ],
  declarations: [TabColacionPage]
})
export class TabColacionPageModule {}
