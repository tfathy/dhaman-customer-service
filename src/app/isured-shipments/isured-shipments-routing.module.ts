import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsuredShipmentsPage } from './isured-shipments.page';

const routes: Routes = [
  {
    path: '',
    component: IsuredShipmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IsuredShipmentsPageRoutingModule {}
