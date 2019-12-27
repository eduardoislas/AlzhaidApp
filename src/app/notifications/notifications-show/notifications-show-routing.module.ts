import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsShowPage } from './notifications-show.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsShowPageRoutingModule {}
