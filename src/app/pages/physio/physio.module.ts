import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysioPageRoutingModule } from './physio-routing.module';

import { PhysioPage } from './physio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysioPageRoutingModule
  ],
  declarations: [PhysioPage]
})
export class PhysioPageModule {}
