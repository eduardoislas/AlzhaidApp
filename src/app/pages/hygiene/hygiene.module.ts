import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HygienePageRoutingModule } from './hygiene-routing.module';

import { HygienePage } from './hygiene.page';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  entryComponents: [
    PopoverComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HygienePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HygienePage]
})
export class HygienePageModule { }
