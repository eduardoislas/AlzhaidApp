import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignosPage } from './signos.page';

const routes: Routes = [
  {
    path: '',
    component: SignosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignosPageRoutingModule {}
