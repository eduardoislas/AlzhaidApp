import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysioPageRoutingModule } from './physio-routing.module';

import { PhysioPage } from './physio.page';
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
    PhysioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PhysioPage]
})
export class PhysioPageModule { }
