import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationSearchPage } from './application-search.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationSearchPage
  },
  {
    path: 'application-form',
    loadChildren: () => import('./application-form/application-form.module').then( m => m.ApplicationFormPageModule)
  },
  {
    path: 'application-form/:applicationId',
    loadChildren: () => import('./application-form/application-form.module').then( m => m.ApplicationFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationSearchPageRoutingModule {}
