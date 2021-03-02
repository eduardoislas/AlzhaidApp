import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignosPageRoutingModule } from './signos-routing.module';

import { SignosPage } from './signos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignosPageRoutingModule
  ],
  declarations: [SignosPage]
})
export class SignosPageModule {}
