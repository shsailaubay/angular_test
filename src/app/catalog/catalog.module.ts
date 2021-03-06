import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../@fury/fury-shared.module';
import { FuryCardModule } from '../../@fury/shared/card/card.module';
import { ListModule } from '../../@fury/shared/list/list.module';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CashReleaseRequestAcceptDialogComponent, CatalogComponent } from './catalog.component';

import { CashReleaseRequestDeclineComponent } from './cash-release-requests/cash-release-request-decline.component';
import { GamingCurrencyRateDialogComponent } from './gaming-currency-rates/gaming-currency-rate-dialog.component';
import { GameDialogComponent } from './games/game-dialog.component';
import { GamingModeDialogComponent } from './gaming-modes/gaming-mode-dialog.component';
import { BoosterDialogComponent } from './boosters/booster-dialog.component';
import { ThemeDialogComponent } from './themes/theme-dialog.component';
import { CountryDialogComponent } from './countries/country-dialog.component';
import { GamersLevelDialogComponent } from './gamers-levels/gamers-level-dialog.component';
import { ActionDialogComponent } from './actions/action-dialog.component';
import { PushNotificationAddDialogComponent } from './push-notifications/push-notification-dialog.component';
import { UserAddDialogComponent } from './users/user-dialog.component';
import { UserRolePipe } from './users/user-role.pipe';
import { FinancialHistoryComponent } from './financial-history/financial-history.component';
import { FinancialHistoryTransfersComponent } from './financial-history/financial-history-transfers/financial-history-transfers.component';
import { FinancialHistoryPurchasesComponent } from './financial-history/financial-history-purchases/financial-history-purchases.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FurySharedModule,
    ListModule,
    CatalogRoutingModule,
    FuryCardModule,
  ],
  declarations: [
    CatalogComponent,
    CashReleaseRequestAcceptDialogComponent,
    CashReleaseRequestDeclineComponent,
    GamingCurrencyRateDialogComponent,
    GameDialogComponent,
    GamingModeDialogComponent,
    BoosterDialogComponent,
    ThemeDialogComponent,
    CountryDialogComponent,
    GamersLevelDialogComponent,
    ActionDialogComponent,
    PushNotificationAddDialogComponent,
    UserAddDialogComponent,
    UserRolePipe,
    FinancialHistoryComponent,
    FinancialHistoryTransfersComponent,
    FinancialHistoryPurchasesComponent,
  ],
  entryComponents: [
    CashReleaseRequestAcceptDialogComponent,
    CashReleaseRequestDeclineComponent,
    GamingCurrencyRateDialogComponent,
    GameDialogComponent,
    GamingModeDialogComponent,
    BoosterDialogComponent,
    ThemeDialogComponent,
    CountryDialogComponent,
    GamersLevelDialogComponent,
    ActionDialogComponent,
    PushNotificationAddDialogComponent,
    UserAddDialogComponent,
  ],
  exports: [
    UserRolePipe,
  ],
})
export class CatalogModule {
}
