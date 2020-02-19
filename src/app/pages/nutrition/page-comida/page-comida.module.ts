import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageComidaPageRoutingModule } from './page-comida-routing.module';

import { PageComidaPage } from './page-comida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageComidaPageRoutingModule
  ],
  declarations: [PageComidaPage]
})
export class PageComidaPageModule {}
