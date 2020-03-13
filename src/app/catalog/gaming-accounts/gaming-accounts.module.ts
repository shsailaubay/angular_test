import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {BreadcrumbsModule} from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import {FuryCardModule} from '../../../@fury/shared/card/card.module';
import {ListModule} from '../../../@fury/shared/list/list.module';

import {GamingAccountsRoutingModule} from './gaming-accounts-routing.module';
import {GamingAccountsService} from './gaming-accounts.service';
import {GamingAccountComponent} from './gaming-account/gaming-account.component';
import {GamingAccountFinancialsOperationsComponent} from './gaming-account/gaming-account-financials-operations/gaming-account-financials-operations.component';
import {GamingAccountRatingsComponent} from './gaming-account/gaming-account-ratings/gaming-account-ratings.component';
import {GamingAccountGamesHistoryComponent} from './gaming-account/gaming-account-games-history/gaming-account-games-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FurySharedModule,
    MaterialModule,
    BreadcrumbsModule,
    FuryCardModule,
    ListModule,
    GamingAccountsRoutingModule
  ],
  providers: [
    GamingAccountsService
  ],
  declarations: [
    GamingAccountComponent,
    GamingAccountFinancialsOperationsComponent,
    GamingAccountRatingsComponent,
    GamingAccountGamesHistoryComponent
  ]
})
export class GamingAccountsModule {
}
