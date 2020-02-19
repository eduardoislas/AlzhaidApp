import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabComidaPageRoutingModule } from './tab-comida-routing.module';

import { TabComidaPage } from './tab-comida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabComidaPageRoutingModule,
  ],
  declarations: [TabComidaPage]
})
export class TabComidaPageModule {}
