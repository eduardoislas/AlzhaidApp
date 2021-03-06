import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelativePageRoutingModule } from './relative-routing.module';

import { RelativePage } from './relative.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelativePageRoutingModule
  ],
  declarations: [RelativePage]
})
export class RelativePageModule {}
