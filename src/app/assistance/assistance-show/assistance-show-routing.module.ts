import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceShowPage } from './assistance-show.page';

const routes: Routes = [
  {
    path: '',
    component: AssistanceShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceShowPageRoutingModule {}
