import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhasePage } from './phase.page';

const routes: Routes = [
  {
    path: '',
    component: PhasePage,
    children: [
      {
        path: 'tab-avisos',
        loadChildren: () => import('./tab-avisos/tab-avisos.module').then( m => m.TabAvisosPageModule)
      },
      {
        path: 'tab-activacion',
        loadChildren: () => import('./tab-activacion/tab-activacion.module').then( m => m.TabActivacionPageModule)
      },
      {
        path: 'tab-bitacora',
        loadChildren: () => import('./tab-bitacora/tab-bitacora.module').then( m => m.TabBitacoraPageModule)
      },
      {
        path: '',
        redirectTo: '/phase/tab-avisos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-avisos',
    pathMatch: 'full'
  },
  {
    path: 'tab-bitacora/page-bitacora',
    loadChildren: () => import('./page-bitacora/page-bitacora.module').then( m => m.PageBitacoraPageModule)
  },
  {
    path: 'tab-activacion/page-actividades',
    loadChildren: () => import('./page-actividades/page-actividades.module').then( m => m.PageActividadesPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhasePageRoutingModule {}
