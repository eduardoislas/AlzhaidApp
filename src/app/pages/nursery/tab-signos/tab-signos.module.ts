import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabSignosPageRoutingModule } from './tab-signos-routing.module';

import { TabSignosPage } from './tab-signos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NurseryModalPage } from '../nursery-modal/nursery-modal.page';
import { NurseryModalPageModule } from '../nursery-modal/nursery-modal.module';

@NgModule({
  entryComponents: [
    NurseryModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabSignosPageRoutingModule,
    ComponentsModule,
    NurseryModalPageModule
  ],
  declarations: [TabSignosPage]
})
export class TabSignosPageModule {}
