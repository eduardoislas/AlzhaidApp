import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidenceAddPage } from './incidence-add.page';

const routes: Routes = [
  {
    path: '',
    component: IncidenceAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidenceAddPageRoutingModule {}
