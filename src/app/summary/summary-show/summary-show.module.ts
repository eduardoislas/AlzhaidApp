import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryShowPageRoutingModule } from './summary-show-routing.module';

import { SummaryShowPage } from './summary-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryShowPageRoutingModule
  ],
  declarations: [SummaryShowPage]
})
export class SummaryShowPageModule {}
