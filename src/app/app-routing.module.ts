import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)},
  {
    path: 'notifications-show', loadChildren: () => import('./notifications/notifications-show/notifications-show.module').then( m => m.NotificationsShowPageModule)
  },
  {
    path: 'assistance-show',
    loadChildren: () => import('./assistance/assistance-show/assistance-show.module').then( m => m.AssistanceShowPageModule)
  },
  {
    path: 'signs',
    loadChildren: () => import('./nursery/signs/signs.module').then( m => m.SignsPageModule)
  },
  {
    path: 'summary-show',
    loadChildren: () => import('./summary/summary-show/summary-show.module').then( m => m.SummaryShowPageModule)
  },
  {
    path: 'notifications-add',
    loadChildren: () => import('./notifications/notifications-add/notifications-add.module').then( m => m.NotificationsAddPageModule)
  },
  {
    path: 'pacient-list-modal',
    loadChildren: () => import('./modals/pacient-list-modal/pacient-list-modal.module').then( m => m.PacientListModalPageModule)
  },
  {
    path: 'technical-support-show',
    loadChildren: () => import('./technical-support/technical-support-show/technical-support-show.module').then( m => m.TechnicalSupportShowPageModule)
  },
  {
    path: 'technical-support-add',
    loadChildren: () => import('./technical-support/technical-support-add/technical-support-add.module').then( m => m.TechnicalSupportAddPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./users/user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  { path: 'nursery-tab', 
  loadChildren: () => import('./tabs/nursery-tab/nursery-tab.module').then(m => m.NurseryTabPageModule)
  },
  {
    path: 'phase',
    loadChildren: () => import('./pages/phase/phase.module').then( m => m.PhasePageModule)
  },
  {
    path: 'nursery',
    loadChildren: () => import('./pages/nursery/nursery.module').then( m => m.NurseryPageModule)
  },
  {
    path: 'nutrition',
    loadChildren: () => import('./pages/nutrition/nutrition.module').then( m => m.NutritionPageModule)
  },
  {
    path: 'hygiene',
    loadChildren: () => import('./pages/hygiene/hygiene.module').then( m => m.HygienePageModule)
  },
  {
    path: 'physio',
    loadChildren: () => import('./pages/physio/physio.module').then( m => m.PhysioPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
