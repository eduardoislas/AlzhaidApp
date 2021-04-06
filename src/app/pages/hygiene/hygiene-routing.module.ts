import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HygienePage } from './hygiene.page';

const routes: Routes = [
  {
    path: '',
    component: HygienePage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: '',
        redirectTo: '/hygiene/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/hygiene/tab1',
    pathMatch: 'full'
  }, {
    path: 'tab2/hygiene-bitacora',
    loadChildren: () => import('./hygiene-bitacora/hygiene-bitacora.module').then(m => m.HygieneModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HygienePageRoutingModule { }
