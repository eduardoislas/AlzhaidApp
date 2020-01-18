import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NurseryModalPage } from './nursery-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NurseryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseryModalPageRoutingModule {}
