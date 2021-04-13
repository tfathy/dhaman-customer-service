import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
    path: 'credit-limit',
    loadChildren: () => import('./credit-limit/credit-limit.module').then( m => m.CreditLimitPageModule),canLoad:[AuthGuard]
  },
  {
    path: 'declaration',
    loadChildren: () => import('./declaration/declaration.module').then( m => m.DeclarationPageModule),canLoad:[AuthGuard]
  },
  {
    path: 'credit-limit-filter',
    loadChildren: () => import('./credit-limit-filter/credit-limit-filter.module').then( m => m.CreditLimitFilterPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule),canLoad:[AuthGuard]
  },
  {
    path: 'application-status',
    loadChildren: () => import('./application-status/application-status.module').then( m => m.ApplicationStatusPageModule),canLoad:[AuthGuard]
  },
  {
    path: 'contract-summary',
    loadChildren: () => import('./contract-summary/contract-summary.module').then( m => m.ContractSummaryPageModule),canLoad:[AuthGuard]
  },
  {
    path: 'overdue-shipment',
    loadChildren: () => import('./overdue-shipment/overdue-shipment.module').then( m => m.OverdueShipmentPageModule),canLoad:[AuthGuard]
  },
  {
    path: 'isured-shipments',
    loadChildren: () => import('./isured-shipments/isured-shipments.module').then( m => m.IsuredShipmentsPageModule),canLoad:[AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
