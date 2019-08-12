import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PushNotificationsRoutingModule} from './push-notifications-routing.module';
import {PushNotificationsComponent} from './push-notifications.component';
import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {ListModule} from '../../../@fury/shared/list/list.module';

@NgModule({
  declarations: [PushNotificationsComponent],
  imports: [
    CommonModule,
    PushNotificationsRoutingModule,
    FurySharedModule,
    MaterialModule,
    ListModule
  ]
})
export class PushNotificationsModule {
}
