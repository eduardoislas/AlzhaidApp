import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { Tab2Page } from './tab2.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@NgModule({
  entryComponents: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2PageRoutingModule,
    ComponentsModule,
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
