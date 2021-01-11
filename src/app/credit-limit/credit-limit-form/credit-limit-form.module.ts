import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditLimitFormPageRoutingModule } from './credit-limit-form-routing.module';

import { CreditLimitFormPage } from './credit-limit-form.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditLimitFormPageRoutingModule,
    SharedModule
  ],
  declarations: [CreditLimitFormPage]
})
export class CreditLimitFormPageModule {}
