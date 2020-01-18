import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab3PageRoutingModule } from './tab3-routing.module';

import { Tab3Page } from './tab3.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PhaseModalPage } from '../phase-modal/phase-modal.page';
import { PhaseModalPageModule } from '../phase-modal/phase-modal.module';

@NgModule({
  entryComponents: [
    PhaseModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab3PageRoutingModule,
    ComponentsModule,
    PhaseModalPageModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
