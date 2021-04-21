import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NurseryPageRoutingModule } from './nursery-routing.module';

import { NurseryPage } from './nursery.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@NgModule({
  entryComponents: [
    PopoverComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseryPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [NurseryPage]
})
export class NurseryPageModule { }
