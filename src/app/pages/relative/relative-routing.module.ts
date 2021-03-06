import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelativePage } from './relative.page';

const routes: Routes = [
  {
    path: '',
    component: RelativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelativePageRoutingModule {}
