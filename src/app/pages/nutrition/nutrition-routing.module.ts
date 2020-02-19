import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutritionPage } from './nutrition.page';

const routes: Routes = [
  {
    path: '',
    component: NutritionPage,
    children: [
      {
        path: 'tab-avisos',
        loadChildren: () => import('./tab-avisos/tab-avisos.module').then( m => m.TabAvisosPageModule)
      },
      {
        path: 'tab-colacion',
        loadChildren: () => import('./tab-colacion/tab-colacion.module').then( m => m.TabColacionPageModule)
      },
      {
        path: 'tab-comida',
        loadChildren: () => import('./tab-comida/tab-comida.module').then( m => m.TabComidaPageModule)
      },
      {
        path: '',
        redirectTo: '/nutrition/tab-avisos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/nutrition/tab-avisos',
    pathMatch: 'full'
  },
  {
    path: 'tab-comida/page-comida',
    loadChildren: () => import('./page-comida/page-comida.module').then( m => m.PageComidaPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionPageRoutingModule {}
