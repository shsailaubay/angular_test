import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {ListModule} from '../../../@fury/shared/list/list.module';

import {PushNotificationsRoutingModule} from './push-notifications-routing.module';
import {PushNotificationsComponent} from './push-notifications.component';

@NgModule({
  imports: [
    CommonModule,
    PushNotificationsRoutingModule,
    FurySharedModule,
    MaterialModule,
    ListModule,
    ReactiveFormsModule
  ],
  declarations: [
    PushNotificationsComponent,
  ],
})
export class PushNotificationsModule {
}
