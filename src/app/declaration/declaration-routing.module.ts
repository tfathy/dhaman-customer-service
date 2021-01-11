import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeclarationPage } from './declaration.page';

const routes: Routes = [
  {
    path: '',
    component: DeclarationPage
  },
  {
    path: 'declaration-form',
    loadChildren: () => import('./declaration-form/declaration-form.module').then( m => m.DeclarationFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeclarationPageRoutingModule {}
