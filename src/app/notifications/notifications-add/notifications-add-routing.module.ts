import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsAddPage } from './notifications-add.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsAddPageRoutingModule {}
