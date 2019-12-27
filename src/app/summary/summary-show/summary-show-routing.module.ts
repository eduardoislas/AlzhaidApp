import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryShowPage } from './summary-show.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryShowPageRoutingModule {}
