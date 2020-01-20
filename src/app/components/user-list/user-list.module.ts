import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserListPageRoutingModule } from './user-list-routing.module';

import { UserListPage } from './user-list.page';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ComponentsModule } from '../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    UserListPageRoutingModule
  ],
  declarations: [UserListPage]
})
export class UserListPageModule {}
