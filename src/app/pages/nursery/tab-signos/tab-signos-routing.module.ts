import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabSignosPage } from './tab-signos.page';

const routes: Routes = [
  {
    path: '',
    component: TabSignosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabSignosPageRoutingModule {}
