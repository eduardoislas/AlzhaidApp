import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhasePageRoutingModule } from './phase-routing.module';

import { PhasePage } from './phase.page';
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
    PhasePageRoutingModule,
    ComponentsModule
  ],
  declarations: [PhasePage]
})
export class PhasePageModule { }
