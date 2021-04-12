import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverdueShipmentPage } from './overdue-shipment.page';

const routes: Routes = [
  {
    path: '',
    component: OverdueShipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverdueShipmentPageRoutingModule {}
