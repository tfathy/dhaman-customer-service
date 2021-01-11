import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditLimitFormPage } from './credit-limit-form.page';

const routes: Routes = [
  {
    path: '',
    component: CreditLimitFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditLimitFormPageRoutingModule {}
