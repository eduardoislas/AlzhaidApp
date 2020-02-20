import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageActividadesPage } from './page-actividades.page';

const routes: Routes = [
  {
    path: '',
    component: PageActividadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageActividadesPageRoutingModule {}
