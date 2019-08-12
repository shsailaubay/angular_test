import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActionsRoutingModule} from './actions-routing.module';
import {ActionsComponent} from './actions.component';
import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {FuryCardModule} from '../../../@fury/shared/card/card.module';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {ListModule} from '../../../@fury/shared/list/list.module';
import {ActionAddComponent} from './action-add/action-add.component';

@NgModule({
  declarations: [ActionsComponent, ActionAddComponent],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    FurySharedModule,
    MaterialModule,
    ListModule,
    FuryCardModule
  ]
})
export class ActionsModule {
}
