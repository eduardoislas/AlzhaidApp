import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelativePage } from './relative.page';

const routes: Routes = [
  {
    path: '',
    component: RelativePage,
    children: [
      {
        path: 'tab-registros',
        loadChildren: () => import('./tab-registros/tab-registros.module').then( m => m.TabRegistrosPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/relative/tab-registros',
    pathMatch: 'full'
  }/*,
  {
    path: 'tab-registros',
    loadChildren: () => import('./tab-registros/tab-registros.module').then( m => m.TabRegistrosPageModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelativePageRoutingModule {}
