import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'phase',
    loadChildren: () => import('./pages/phase/phase.module').then(m => m.PhasePageModule)
  },
  {
    path: 'nursery',
    loadChildren: () => import('./pages/nursery/nursery.module').then(m => m.NurseryPageModule)
  },
  {
    path: 'nutrition',
    loadChildren: () => import('./pages/nutrition/nutrition.module').then(m => m.NutritionPageModule)
  },
  {
    path: 'hygiene',
    loadChildren: () => import('./pages/hygiene/hygiene.module').then(m => m.HygienePageModule)
  },
  {
    path: 'physio',
    loadChildren: () => import('./pages/physio/physio.module').then(m => m.PhysioPageModule)
  },
  {
    path: 'notifications-add',
    loadChildren: () => import('./components/notifications-add/notifications-add.module').then(m => m.NotificationsAddPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./components/user-list/user-list.module').then(m => m.UserListPageModule)
  },
  {
    path: 'relative',
    loadChildren: () => import('./pages/relative/relative.module').then(m => m.RelativePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
