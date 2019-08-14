import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {FurySharedModule} from '../../@fury/fury-shared.module';
import {MaterialModule} from '../../@fury/shared/material-components.module';
import {ListModule} from '../../@fury/shared/list/list.module';

import {CountriesRoutingModule} from './countries-routing.module';
import {CountriesService} from './countries.service';
import {CountriesComponent, CountryDialogComponent} from './countries.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FurySharedModule,
    MaterialModule,
    ListModule,
    CountriesRoutingModule
  ],
  providers: [
    CountriesService
  ],
  declarations: [
    CountriesComponent,
    CountryDialogComponent
  ],
  entryComponents: [CountryDialogComponent]
})
export class CountriesModule {
}
