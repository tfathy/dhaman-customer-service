import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverdueShipmentPageRoutingModule } from './overdue-shipment-routing.module';

import { OverdueShipmentPage } from './overdue-shipment.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverdueShipmentPageRoutingModule,
    SharedModule
  ],
  declarations: [OverdueShipmentPage]
})
export class OverdueShipmentPageModule {}
