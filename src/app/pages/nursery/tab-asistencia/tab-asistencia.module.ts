import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAsistenciaPageRoutingModule } from './tab-asistencia-routing.module';

import { TabAsistenciaPage } from './tab-asistencia.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@NgModule({
  entryComponents: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAsistenciaPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [TabAsistenciaPage]
})
export class TabAsistenciaPageModule {}
