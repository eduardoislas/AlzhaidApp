import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{NotificationsShowPageModule} from '../../notifications/notifications-show/notifications-show.module';
import{AssistanceShowPageModule} from '../../assistance/assistance-show/assistance-show.module';
import{SignsPageModule} from '../../nursery/signs/signs.module';
import{SummaryShowPageModule} from '../../summary/summary-show/summary-show.module';
import{TechnicalSupportShowPageModule} from '../../technical-support/technical-support-show/technical-support-show.module';
import { NurseryTabPage } from './nursery-tab.page';

const routes: Routes = [
  {
    path: 'nursery-tab',
    component: NurseryTabPage,
    children: [
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('../../notifications/notifications-show/notifications-show.module').then(m => m.NotificationsShowPageModule)
          }
        ]
      },
      {
        path: 'assistance',
        children: [
          {
            path: '',
            loadChildren: () => import('../../assistance/assistance-show/assistance-show.module').then(m => m.AssistanceShowPageModule)
          }
        ]
      },
      {
        path: 'signs',
        children: [
          {
            path: '',
            loadChildren: () => import('../../nursery/signs/signs.module').then(m => m.SignsPageModule)
          }
        ]
      },
       {
        path: 'summary',
        children: [
          {
            path: '',
            loadChildren: () => import('../../summary/summary-show/summary-show.module').then(m => m.SummaryShowPageModule)
          }
        ]
      },
      {
        path: 'technical-support',
        children: [
          {
            path: '',
            loadChildren: () => import('../../technical-support/technical-support-show/technical-support-show.module').then(m => m.TechnicalSupportShowPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'nursery-tab/notifications',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseryTabPageRoutingModule {}
