import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabRegistrosPage } from './tab-registros.page';

const routes: Routes = [
  {
    path: '',
    component: TabRegistrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabRegistrosPageRoutingModule {}
