import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhaseModalPage } from './phase-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PhaseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhaseModalPageRoutingModule {}
