import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NurseryTabPageRoutingModule } from './nursery-tab-routing.module';

import { NurseryTabPage } from './nursery-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseryTabPageRoutingModule
  ],
  declarations: [NurseryTabPage]
})
export class NurseryTabPageModule {}
