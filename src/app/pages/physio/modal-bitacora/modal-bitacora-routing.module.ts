import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBitacoraPage } from './modal-bitacora.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBitacoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBitacoraPageRoutingModule {}
