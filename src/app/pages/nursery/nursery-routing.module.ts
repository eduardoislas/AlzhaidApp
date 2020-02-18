import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NurseryPage } from './nursery.page';

const routes: Routes = [
  {
    path: '',
    component: NurseryPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./tab-avisos/tab-avisos.module').then( m => m.TabAvisosPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab-asistencia/tab-asistencia.module').then( m => m.TabAsistenciaPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab-signos/tab-signos.module').then( m => m.TabSignosPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('./tab-registros/tab-registros.module').then( m => m.TabRegistrosPageModule)
      },
      {
        path: '',
        redirectTo: '/nursery/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/nursery/tab1',
    pathMatch: 'full'
  },
  {
    path: 'tab3/signos',
    loadChildren: () => import('./signos/signos.module').then( m => m.SignosPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseryPageRoutingModule {}
