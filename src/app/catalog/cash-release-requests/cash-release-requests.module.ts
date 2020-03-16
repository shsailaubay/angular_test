import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashReleaseRequestsComponent} from './cash-release-requests.component';
import {CashReleaseRequestsRoutingModule} from './cash-release-requests-routing.module';
import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {ListModule} from '../../../@fury/shared/list/list.module';

@NgModule({
  declarations: [
    CashReleaseRequestsComponent,
  ],
  imports: [
    CommonModule,
    CashReleaseRequestsRoutingModule,
    FurySharedModule,
    MaterialModule,
    ListModule
  ],
})

export class CashReleaseRequestsModule {
}
