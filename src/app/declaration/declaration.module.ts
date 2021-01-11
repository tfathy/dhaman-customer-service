import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeclarationPageRoutingModule } from './declaration-routing.module';

import { DeclarationPage } from './declaration.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeclarationPageRoutingModule,
    SharedModule
  ],
  declarations: [DeclarationPage]
})
export class DeclarationPageModule {}
