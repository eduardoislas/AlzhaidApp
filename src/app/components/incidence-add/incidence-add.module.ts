import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidenceAddPageRoutingModule } from './incidence-add-routing.module';

import { IncidenceAddPage } from './incidence-add.page';

import { UserListPageModule } from '../user-list/user-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidenceAddPageRoutingModule,
    UserListPageModule
  ],
  declarations: [IncidenceAddPage]
})
export class IncidenceAddPageModule {}
