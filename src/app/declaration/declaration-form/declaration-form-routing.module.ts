import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeclarationFormPage } from './declaration-form.page';

const routes: Routes = [
  {
    path: '',
    component: DeclarationFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeclarationFormPageRoutingModule {}
