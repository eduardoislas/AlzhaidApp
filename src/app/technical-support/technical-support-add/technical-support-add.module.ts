import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicalSupportAddPageRoutingModule } from './technical-support-add-routing.module';

import { TechnicalSupportAddPage } from './technical-support-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicalSupportAddPageRoutingModule
  ],
  declarations: [TechnicalSupportAddPage]
})
export class TechnicalSupportAddPageModule {}
