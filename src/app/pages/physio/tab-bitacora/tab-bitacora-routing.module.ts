import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabBitacoraPage } from './tab-bitacora.page';

const routes: Routes = [
  {
    path: '',
    component: TabBitacoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabBitacoraPageRoutingModule {}
