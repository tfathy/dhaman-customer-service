import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditLimitPage } from './credit-limit.page';

const routes: Routes = [
  {
    path: '',
    component: CreditLimitPage
  },
  {
    path: 'credit-limit-form',
    loadChildren: () => import('./credit-limit-form/credit-limit-form.module').then( m => m.CreditLimitFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditLimitPageRoutingModule {}
