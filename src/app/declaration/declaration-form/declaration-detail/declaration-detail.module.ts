import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeclarationDetailPageRoutingModule } from './declaration-detail-routing.module';

import { DeclarationDetailPage } from './declaration-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeclarationDetailPageRoutingModule
  ],
  declarations: [DeclarationDetailPage]
})
export class DeclarationDetailPageModule {}
