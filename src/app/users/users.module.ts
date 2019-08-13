import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FurySharedModule} from '../../@fury/fury-shared.module';
import {MaterialModule} from '../../@fury/shared/material-components.module';
import {ListModule} from '../../@fury/shared/list/list.module';

import {UsersRoutingModule} from './users-routing.module';
import {UsersService} from './users.service';
import {UsersComponent, UserAddDialogComponent} from './users.component';

@NgModule({
  imports: [
    CommonModule,
    FurySharedModule,
    MaterialModule,
    ListModule,
    UsersRoutingModule
  ],
  providers: [
    UsersService
  ],
  declarations: [
    UsersComponent,
    UserAddDialogComponent
  ],
  entryComponents: [
    UserAddDialogComponent
  ]
})
export class UsersModule {
}
