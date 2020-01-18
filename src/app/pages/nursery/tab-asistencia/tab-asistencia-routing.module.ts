import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAsistenciaPage } from './tab-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: TabAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAsistenciaPageRoutingModule {}
