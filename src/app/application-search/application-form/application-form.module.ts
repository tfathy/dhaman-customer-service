import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationFormPageRoutingModule } from './application-form-routing.module';

import { ApplicationFormPage } from './application-form.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationFormPageRoutingModule,
    SharedModule
  ],
  declarations: [ApplicationFormPage]
})
export class ApplicationFormPageModule {}
