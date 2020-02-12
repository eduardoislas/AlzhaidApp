import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
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
    Tab4PageRoutingModule,
    ComidaModalPageModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
