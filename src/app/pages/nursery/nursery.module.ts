import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NurseryPageRoutingModule } from './nursery-routing.module';

import { NurseryPage } from './nursery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseryPageRoutingModule
  ],
  declarations: [NurseryPage]
})
export class NurseryPageModule {}
