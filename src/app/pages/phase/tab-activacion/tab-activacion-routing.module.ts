import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabActivacionPage } from './tab-activacion.page';

const routes: Routes = [
  {
    path: '',
    component: TabActivacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabActivacionPageRoutingModule {}
