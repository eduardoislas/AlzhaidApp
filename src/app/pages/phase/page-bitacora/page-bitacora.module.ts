import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageBitacoraPageRoutingModule } from './page-bitacora-routing.module';

import { PageBitacoraPage } from './page-bitacora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageBitacoraPageRoutingModule
  ],
  declarations: [PageBitacoraPage]
})
export class PageBitacoraPageModule {}
