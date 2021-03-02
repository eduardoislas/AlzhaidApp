import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabComidaPage } from './tab-comida.page';

const routes: Routes = [
  {
    path: '',
    component: TabComidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabComidaPageRoutingModule {}
