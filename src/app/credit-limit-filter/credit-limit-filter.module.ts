import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditLimitFilterPageRoutingModule } from './credit-limit-filter-routing.module';

import { CreditLimitFilterPage } from './credit-limit-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditLimitFilterPageRoutingModule
  ],
  declarations: [CreditLimitFilterPage]
})
export class CreditLimitFilterPageModule {}
