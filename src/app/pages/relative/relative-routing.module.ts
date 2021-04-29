import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelativePage } from './relative.page';
import { TabAvisosPageModule } from './tab-avisos/tab-avisos/tab-avisos.module';

const routes: Routes = [
  {
    path: '',
    component: RelativePage,
    children: [
      {
        path: 'tab-registros',
        loadChildren: () => import('./tab-registros/tab-registros.module').then(m => m.TabRegistrosPageModule)
      },
      {
        path: 'tab-avisos',
        loadChildren: () => import('./tab-avisos/tab-avisos/tab-avisos.module').then(m => m.TabAvisosPageModule)
      },
      {
        path: '',
        redirectTo: '/relative/tab-avisos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/relative/tab-avisos',
    pathMatch: 'full'
  }
  /*,
  {
    path: 'tab-registros',
    loadChildren: () => import('./tab-registros/tab-registros.module').then( m => m.TabRegistrosPageModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelativePageRoutingModule { }
