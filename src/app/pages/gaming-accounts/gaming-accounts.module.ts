import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { ListModule } from '../../../@fury/shared/list/list.module';

import { GamingAccountsComponent } from './gaming-accounts.component';
import { GamingAccountsRoutingModule } from './gaming-accounts-routing.module';
import { GamingAccountComponent } from './gaming-account/gaming-account.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FurySharedModule,
    MaterialModule,
    BreadcrumbsModule,
    FuryCardModule,
    ListModule,
    GamingAccountsRoutingModule
  ],
  declarations: [
    GamingAccountsComponent,
    GamingAccountComponent
  ]
})

export class GamingAccountsModule { }
