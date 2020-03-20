import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {ListModule} from '../../../@fury/shared/list/list.module';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FurySharedModule,
    MaterialModule,
    ListModule,
    UsersRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UsersComponent,
  ],
})
export class UsersModule {
}
