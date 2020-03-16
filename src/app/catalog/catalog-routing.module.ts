import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog.component';

import { countriesRouteData } from './countries/countries-route-data';
import { gamingAccountsRouteData } from './gaming-accounts/gaming-accounts-route-data';
import { cashReleaseRequestsRouteData } from './cash-release-requests/cash-release-requests-route-data';
import { gamingCurrencyRatesRouteData } from './gaming-currency-rates/gaming-currency-rates-route-data';
import { gamesRouteData } from './games/games-route-data';
import { gamingModesRouteData } from './gaming-modes/gaming-modes-route-data';
import { boostersRouteData } from './boosters/boosters-route-data';
import { themesRouteData } from './themes/themes-route-data';
import { gamersLevelsRouteData } from './gamers-levels/gamers-levels-route-data';
import { actionsRouteData } from './actions/actions-route-data';
import { pushNotificationsRouteData } from './push-notifications/push-notifications-route-data';
import { usersRouteData } from './users/users-route-data';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full',
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
  },
  {
    path: 'gaming-accounts',
    component: CatalogComponent,
    data: gamingAccountsRouteData,
    children: [
      {
        path: ':id',
        loadChildren: () => import('./gaming-accounts/gaming-accounts.module').then(m => m.GamingAccountsModule),
      },
    ],
  },
  {
    path: 'cash-release-requests',
    component: CatalogComponent,
    data: cashReleaseRequestsRouteData,
  },
  {
    path: 'gaming-currency-rates',
    component: CatalogComponent,
    data: gamingCurrencyRatesRouteData,
  },
  {
    path: 'games',
    component: CatalogComponent,
    data: gamesRouteData,
  },
  {
    path: 'gaming-modes',
    component: CatalogComponent,
    data: gamingModesRouteData,
  },
  {
    path: 'boosters',
    component: CatalogComponent,
    data: boostersRouteData,
  },
  {
    path: 'themes',
    component: CatalogComponent,
    data: themesRouteData,
  },
  {
    path: 'countries',
    component: CatalogComponent,
    data: countriesRouteData,
  },
  {
    path: 'gamers-levels',
    component: CatalogComponent,
    data: gamersLevelsRouteData,
  },
  {
    path: 'actions',
    component: CatalogComponent,
    data: actionsRouteData,
  },
  {
    path: 'push-notifications',
    component: CatalogComponent,
    data: pushNotificationsRouteData,
  },
  {
    path: 'users',
    component: CatalogComponent,
    data: usersRouteData,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {
}
