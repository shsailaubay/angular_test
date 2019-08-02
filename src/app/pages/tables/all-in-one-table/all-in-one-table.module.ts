import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';

import { AllInOneTableComponent } from './all-in-one-table.component';
import { AllInOneTableRoutingModule } from './all-in-one-table-routing.module';

import { CustomerCreateUpdateModule } from './customer-create-update/customer-create-update.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FurySharedModule,
    MaterialModule,
    AllInOneTableRoutingModule,

    // Core
    BreadcrumbsModule,
    ListModule,
    CustomerCreateUpdateModule
  ],
  declarations: [AllInOneTableComponent],
  exports: [AllInOneTableComponent]
})

export class AllInOneTableModule {
}
