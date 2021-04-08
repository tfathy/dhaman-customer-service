import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationStatusPage } from './application-status.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationStatusPageRoutingModule {}
