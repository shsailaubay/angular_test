import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurySharedModule } from '../../@fury/fury-shared.module';
import { MaterialModule } from '../../@fury/shared/material-components.module';
import { ListModule } from '../../@fury/shared/list/list.module';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';

import { CountryDialogComponent } from './countries/country-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GamingCurrencyRateDialogComponent } from './gaming-currency-rates/gaming-currency-rate-dialog.component';
import { GameDialogComponent } from './games/game-dialog.component';
import { GamingModeDialogComponent } from './gaming-modes/gaming-mode-dialog.component';
import { BoosterDialogComponent } from './boosters/booster-dialog.component';
import { ThemeDialogComponent } from './themes/theme-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FurySharedModule,
    ListModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    CatalogComponent,
    GamingCurrencyRateDialogComponent,
    GameDialogComponent,
    GamingModeDialogComponent,
    BoosterDialogComponent,
    ThemeDialogComponent,
    CountryDialogComponent,
  ],
  entryComponents: [
    GamingCurrencyRateDialogComponent,
    GameDialogComponent,
    GamingModeDialogComponent,
    BoosterDialogComponent,
    ThemeDialogComponent,
    CountryDialogComponent,
  ]
})
export class CatalogModule {
}
