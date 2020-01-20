import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhaseModalActividadesPage } from './phase-modal-actividades.page';

const routes: Routes = [
  {
    path: '',
    component: PhaseModalActividadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhaseModalActividadesPageRoutingModule {}
