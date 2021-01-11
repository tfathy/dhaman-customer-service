import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeclarationFormPageRoutingModule } from './declaration-form-routing.module';

import { DeclarationFormPage } from './declaration-form.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeclarationFormPageRoutingModule,
    SharedModule
  ],
  declarations: [DeclarationFormPage]
})
export class DeclarationFormPageModule {}
