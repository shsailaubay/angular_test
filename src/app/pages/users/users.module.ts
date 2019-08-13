import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserAddDialogComponent, UsersComponent} from './users.component';
import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {ListModule} from '../../../@fury/shared/list/list.module';

@NgModule({
  declarations: [UsersComponent, UserAddDialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FurySharedModule,
    MaterialModule,
    ListModule
  ],
  entryComponents: [UserAddDialogComponent]
})
export class UsersModule {
}
