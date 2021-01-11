import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditLimitPageRoutingModule } from './credit-limit-routing.module';

import { CreditLimitPage } from './credit-limit.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditLimitPageRoutingModule,
    SharedModule
  ],
  declarations: [CreditLimitPage]
})
export class CreditLimitPageModule {}
