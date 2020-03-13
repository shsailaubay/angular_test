import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportsRoutingModule} from './reports-routing.module';
import {ReportsComponent} from './reports.component';
import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {FuryCardModule} from '../../../@fury/shared/card/card.module';
import {ListModule} from '../../../@fury/shared/list/list.module';
import {ReportsCountriesComponent} from './reports-countries/reports-countries.component';
import {FinancialStatisticComponent} from './financial-statistic/financial-statistic.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ReportsComponent, ReportsCountriesComponent, FinancialStatisticComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FurySharedModule,
    MaterialModule,
    FuryCardModule,
    ListModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule {
}
