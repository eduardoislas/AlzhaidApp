import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NurseryPage } from './nursery.page';

const routes: Routes = [
  {
    path: '',
    component: NurseryPage,
    children: [
      {
        path: 'tab-avisos',
        loadChildren: () => import('./tab-avisos/tab-avisos.module').then(m => m.TabAvisosPageModule)
      },
      {
        path: 'tab-asistencia',
        loadChildren: () => import('./tab-asistencia/tab-asistencia.module').then(m => m.TabAsistenciaPageModule)
      },
      {
        path: 'tab-signos',
        loadChildren: () => import('./tab-signos/tab-signos.module').then(m => m.TabSignosPageModule)
      },
      {
        path: '',
        redirectTo: '/nursery/tab-avisos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/nursery/tab-avisos',
    pathMatch: 'full'
  },
  {
    path: 'tab-signos/signos',
    loadChildren: () => import('./signos/signos.module').then(m => m.SignosPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseryPageRoutingModule { }
