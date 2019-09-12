import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './authentication/login/login.module#LoginModule',
  },
  {
    path: 'register',
    loadChildren: './authentication/register/register.module#RegisterModule',
  },
  {
    path: 'forgot-password',
    loadChildren: './authentication/forgot-password/forgot-password.module#ForgotPasswordModule',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        pathMatch: 'full'
      },
      {
        path: 'gaming-accounts',
        loadChildren: './gaming-accounts/gaming-accounts.module#GamingAccountsModule',
      },
      {
        path: 'cash-release-requests',
        loadChildren: './cash-release-requests/cash-release-requests.module#CashReleaseRequestsModule',
      },
      {
        path: 'gaming-currency-rates',
        loadChildren: './gaming-currency-rates/gaming-currency-rates.module#GamingCurrencyRatesModule',
      },
      {
        path: 'games',
        loadChildren: './games/games.module#GamesModule',
      },
      {
        path: 'boosters',
        loadChildren: './boosters/boosters.module#BoostersModule',
      },
      {
        path: 'themes',
        loadChildren: './themes/themes.module#ThemesModule',
      },
      {
        path: 'countries',
        loadChildren: './countries/countries.module#CountriesModule',
      },
      {
        path: 'gamers-levels',
        loadChildren: './gamers-levels/gamers-levels.module#GamersLevelsModule',
      },
      {
        path: 'actions',
        loadChildren: './actions/actions.module#ActionsModule',
      },
      {
        path: 'push-notifications',
        loadChildren: './push-notifications/push-notifications.module#PushNotificationsModule',
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
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
