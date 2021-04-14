import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractAnnexPageRoutingModule } from './contract-annex-routing.module';

import { ContractAnnexPage } from './contract-annex.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractAnnexPageRoutingModule,
    SharedModule
  ],
  declarations: [ContractAnnexPage]
})
export class ContractAnnexPageModule {}
