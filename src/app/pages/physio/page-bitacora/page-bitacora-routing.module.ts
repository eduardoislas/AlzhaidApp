import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageBitacoraPage } from './page-bitacora.page';

const routes: Routes = [
  {
    path: '',
    component: PageBitacoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageBitacoraPageRoutingModule {}
