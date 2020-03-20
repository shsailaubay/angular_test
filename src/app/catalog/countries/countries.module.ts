import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ListModule } from '../../../@fury/shared/list/list.module';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FurySharedModule,
    MaterialModule,
    ListModule,
    CountriesRoutingModule
  ],
  declarations: [
    CountriesComponent,
  ],
})
export class CountriesModule {
}
