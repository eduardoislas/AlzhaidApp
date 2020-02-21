import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAvisosPage } from './tab-avisos.page';

const routes: Routes = [
  {
    path: '',
    component: TabAvisosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAvisosPageRoutingModule {}
