import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicalSupportShowPageRoutingModule } from './technical-support-show-routing.module';

import { TechnicalSupportShowPage } from './technical-support-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicalSupportShowPageRoutingModule
  ],
  declarations: [TechnicalSupportShowPage]
})
export class TechnicalSupportShowPageModule {}
