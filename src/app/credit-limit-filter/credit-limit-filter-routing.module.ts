import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditLimitFilterPage } from './credit-limit-filter.page';

const routes: Routes = [
  {
    path: '',
    component: CreditLimitFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditLimitFilterPageRoutingModule {}
