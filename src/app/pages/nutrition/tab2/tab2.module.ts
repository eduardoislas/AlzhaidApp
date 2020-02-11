import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { Tab2Page } from './tab2.page';
import { ComidaModalPage } from '../comida-modal/comida-modal.page';
import { ComidaModalPageModule } from '../comida-modal/comida-modal.module';

@NgModule({
  entryComponents: [
    ComidaModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2PageRoutingModule,
    ComidaModalPageModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
