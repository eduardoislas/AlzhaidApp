import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HygienePageRoutingModule } from './hygiene-routing.module';

import { HygienePage } from './hygiene.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HygienePageRoutingModule
  ],
  declarations: [HygienePage]
})
export class HygienePageModule {}
