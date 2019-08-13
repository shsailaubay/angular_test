import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CountriesRoutingModule} from './countries-routing.module';
import {CountriesComponent, CountryDialogComponent} from './countries.component';
import {FurySharedModule} from '../../@fury/fury-shared.module';
import {ListModule} from '../../@fury/shared/list/list.module';
import {MaterialModule} from '../../@fury/shared/material-components.module';

@NgModule({
  declarations: [
    CountriesComponent,
    CountryDialogComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    FurySharedModule,
    ListModule,
    MaterialModule
  ],
  entryComponents: [CountryDialogComponent]
})
export class CountriesModule {
}
