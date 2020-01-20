import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhasePage } from './phase.page';

const routes: Routes = [
  {
    path: '',
    component: PhasePage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
      },
      {
        path: '',
        redirectTo: '/phase/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'modal-conducta',
    loadChildren: () => import('./phase-modal/phase-modal.module').then( m => m.PhaseModalPageModule)
  },  {
    path: 'phase-modal-actividades',
    loadChildren: () => import('./phase-modal-actividades/phase-modal-actividades.module').then( m => m.PhaseModalActividadesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhasePageRoutingModule {}
