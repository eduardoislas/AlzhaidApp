import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HygieneModalPage } from './hygiene-bitacora.page';

const routes: Routes = [
  {
    path: '',
    component: HygieneModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HygieneModalPageRoutingModule {}
