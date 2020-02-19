import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysioPage } from './physio.page';

const routes: Routes = [
  {
    path: '',
    component: PhysioPage,
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
        redirectTo: '/physio/tab-avisos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/physio/tab-avisos',
    pathMatch: 'full'
  },
  {
    path: 'tab-bitacora/page-bitacora',
    loadChildren: () => import('./page-bitacora/page-bitacora.module').then( m => m.PageBitacoraPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysioPageRoutingModule {}
