import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicalSupportShowPage } from './technical-support-show.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicalSupportShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicalSupportShowPageRoutingModule {}
