import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceShowPageRoutingModule } from './assistance-show-routing.module';
import { PacientListModalPage } from '../../modals/pacient-list-modal/pacient-list-modal.page';
import { AssistanceShowPage } from './assistance-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceShowPageRoutingModule
  ],
  declarations: [AssistanceShowPage,PacientListModalPage],
  entryComponents: [PacientListModalPage]
})
export class AssistanceShowPageModule {}
