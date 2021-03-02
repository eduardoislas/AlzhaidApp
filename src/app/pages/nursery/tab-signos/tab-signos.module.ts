import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabSignosPageRoutingModule } from './tab-signos-routing.module';

import { TabSignosPage } from './tab-signos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  entryComponents: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabSignosPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [TabSignosPage]
})
export class TabSignosPageModule {}
