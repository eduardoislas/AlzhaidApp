import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageActividadesPageRoutingModule } from './page-actividades-routing.module';

import { PageActividadesPage } from './page-actividades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageActividadesPageRoutingModule
  ],
  declarations: [PageActividadesPage]
})
export class PageActividadesPageModule {}
