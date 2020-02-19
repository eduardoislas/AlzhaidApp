import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabColacionPage } from './tab-colacion.page';

const routes: Routes = [
  {
    path: '',
    component: TabColacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabColacionPageRoutingModule {}
