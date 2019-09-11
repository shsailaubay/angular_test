import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {FurySharedModule} from '../../@fury/fury-shared.module';
import {MaterialModule} from '../../@fury/shared/material-components.module';
import {ListModule} from '../../@fury/shared/list/list.module';

import {GamesRoutingModule} from './games-routing.module';
import {GameDialogComponent, GamesComponent} from './games.component';

@NgModule({
  imports: [
    CommonModule,
    FurySharedModule,
    MaterialModule,
    ListModule,
    ReactiveFormsModule,
    GamesRoutingModule
  ],
  declarations: [
    GamesComponent,
    GameDialogComponent
  ],
  entryComponents: [GameDialogComponent]
})
export class GamesModule {
}
