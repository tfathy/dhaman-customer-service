import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IsuredShipmentsPageRoutingModule } from './isured-shipments-routing.module';

import { IsuredShipmentsPage } from './isured-shipments.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IsuredShipmentsPageRoutingModule,
    SharedModule
  ],
  declarations: [IsuredShipmentsPage]
})
export class IsuredShipmentsPageModule {}
