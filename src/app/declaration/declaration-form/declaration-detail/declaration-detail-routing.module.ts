import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeclarationDetailPage } from './declaration-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DeclarationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeclarationDetailPageRoutingModule {}
