import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractSummaryPage } from './contract-summary.page';

const routes: Routes = [
  {
    path: '',
    component: ContractSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractSummaryPageRoutingModule {}
