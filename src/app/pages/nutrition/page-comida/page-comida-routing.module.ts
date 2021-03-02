import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComidaPage } from './page-comida.page';

const routes: Routes = [
  {
    path: '',
    component: PageComidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageComidaPageRoutingModule {}
