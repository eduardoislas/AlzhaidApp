import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab3PageRoutingModule } from './tab3-routing.module';

import { Tab3Page } from './tab3.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalBitacoraPage } from '../modal-bitacora/modal-bitacora.page';
import { ModalBitacoraPageModule } from '../modal-bitacora/modal-bitacora.module';

@NgModule({
  entryComponents: [
    ModalBitacoraPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab3PageRoutingModule,
    ComponentsModule,
    ModalBitacoraPageModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
