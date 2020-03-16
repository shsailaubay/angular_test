import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamingCurrencyRatesRoutingModule } from './gaming-currency-rates-routing.module';
import { GamingCurrencyRatesComponent } from './gaming-currency-rates.component';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ListModule } from '../../../@fury/shared/list/list.module';
import { GamingCurrencyRateDialogComponent } from './gaming-currency-rate-dialog.component';

@NgModule({
  declarations: [
    GamingCurrencyRatesComponent,
    GamingCurrencyRateDialogComponent
  ],
  imports: [
    CommonModule,
    GamingCurrencyRatesRoutingModule,
    FurySharedModule,
    MaterialModule,
    ListModule
  ],
  entryComponents: [
    GamingCurrencyRateDialogComponent
  ]
})
export class GamingCurrencyRatesModule {
}