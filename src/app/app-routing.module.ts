import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/authentication/login/login.module#LoginModule',
  },
  {
    path: 'register',
    loadChildren: './pages/authentication/register/register.module#RegisterModule',
  },
  {
    path: 'forgot-password',
    loadChildren: './pages/authentication/forgot-password/forgot-password.module#ForgotPasswordModule',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
        pathMatch: 'full'
      },
      {
        path: 'gaming-accounts',
        loadChildren: './pages/gaming-accounts/gaming-accounts.module#GamingAccountsModule',
      },
      {
        path: 'cash-release-requests',
        loadChildren: './pages/cash-release-requests/cash-release-requests.module#CashReleaseRequestsModule',
      },
      {
        path: 'gaming-currency-rates',
        loadChildren: './pages/gaming-currency-rates/gaming-currency-rates.module#GamingCurrencyRatesModule',
      },
      {
        path: 'countries',
        loadChildren: './pages/countries/countries.module#CountriesModule',
      },
      {
        path: 'users',
        loadChildren: './pages/users/users.module#UsersModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
