import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationStatusPageRoutingModule } from './application-status-routing.module';

import { ApplicationStatusPage } from './application-status.page';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationStatusPageRoutingModule,
    SharedModule
  ],
  declarations: [ApplicationStatusPage]
})
export class ApplicationStatusPageModule {}
