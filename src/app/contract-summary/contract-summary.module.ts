import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractSummaryPageRoutingModule } from './contract-summary-routing.module';

import { ContractSummaryPage } from './contract-summary.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractSummaryPageRoutingModule,
    SharedModule
  ],
  declarations: [ContractSummaryPage]
})
export class ContractSummaryPageModule {}
