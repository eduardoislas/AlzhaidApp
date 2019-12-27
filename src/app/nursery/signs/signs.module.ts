import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignsPageRoutingModule } from './signs-routing.module';

import { SignsPage } from './signs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignsPageRoutingModule
  ],
  declarations: [SignsPage]
})
export class SignsPageModule {}
