import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditLimitFormPage } from './credit-limit-form.page';

const routes: Routes = [
  {
    path: '',
    component: CreditLimitFormPage
  },
  {
    path: ':applicationId',
    component: CreditLimitFormPage
  },  
  {
    path: 'buyer/:cldId',
    loadChildren: () => import('./buyer/buyer.module').then( m => m.BuyerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditLimitFormPageRoutingModule {}
