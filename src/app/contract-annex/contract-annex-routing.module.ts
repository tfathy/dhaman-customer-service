import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractAnnexPage } from './contract-annex.page';

const routes: Routes = [
  {
    path: '',
    component: ContractAnnexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractAnnexPageRoutingModule {}
