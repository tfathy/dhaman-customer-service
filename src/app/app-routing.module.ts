import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canLoad:[AuthGuard]
  },
  {
    path: 'application-search',
    loadChildren: () => import('./application-search/application-search.module').then( m => m.ApplicationSearchPageModule),canLoad:[AuthGuard]
  },
  {
    path: 'credit-limit',
    loadChildren: () => import('./credit-limit/credit-limit.module').then( m => m.CreditLimitPageModule),canLoad:[AuthGuard]
  },
  {
    path: 'declaration',
    loadChildren: () => import('./declaration/declaration.module').then( m => m.DeclarationPageModule),canLoad:[AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
