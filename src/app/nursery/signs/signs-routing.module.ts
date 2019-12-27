import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignsPage } from './signs.page';

const routes: Routes = [
  {
    path: '',
    component: SignsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignsPageRoutingModule {}
