import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NurseryPageRoutingModule } from './nursery-routing.module';

import { NurseryPage } from './nursery.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NurseryPage]
})
export class NurseryPageModule {}
