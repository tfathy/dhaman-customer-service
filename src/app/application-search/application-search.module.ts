import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationSearchPageRoutingModule } from './application-search-routing.module';

import { ApplicationSearchPage } from './application-search.page';
import { SharedModule } from '../shared/shared/shared.module';
import { ApplicationTableComponent } from './components/application-table/application-table.component';


@NgModule({  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationSearchPageRoutingModule,
    SharedModule
  ],
  declarations: [ApplicationSearchPage,ApplicationTableComponent]
})
export class ApplicationSearchPageModule {}
