import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientListModalPage } from './pacient-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PacientListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientListModalPageRoutingModule {}
