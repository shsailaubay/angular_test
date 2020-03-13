import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatDialogModule, MatPaginatorModule, MatSelectModule, MatTableModule } from '@angular/material';
import { FurySharedModule } from '../../@fury/fury-shared.module';
import { ListModule } from '../../@fury/shared/list/list.module';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';

import { CountryDialogComponent } from './countries/country-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GamingCurrencyRateDialogComponent } from './gaming-currency-rates/gaming-currency-rate-dialog.component';
import { GameDialogComponent } from './games/game-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FurySharedModule,
    ListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [
    CatalogComponent,
    GamingCurrencyRateDialogComponent,
    GameDialogComponent,
    CountryDialogComponent,
  ],
  entryComponents: [
    GamingCurrencyRateDialogComponent,
    GameDialogComponent,
    CountryDialogComponent,
  ]
})
export class CatalogModule { }
