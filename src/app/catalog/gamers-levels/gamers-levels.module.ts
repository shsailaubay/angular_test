import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatPaginatorModule, MatTableModule} from '@angular/material';

import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {ListModule} from '../../../@fury/shared/list/list.module';

import {GamersLevelsRoutingModule} from './gamers-levels-routing.module';
import {GamersLevelDialogComponent, GamersLevelsComponent} from './gamers-levels.component';

@NgModule({
  imports: [
    CommonModule,
    GamersLevelsRoutingModule,
    FurySharedModule,
    ListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  declarations: [
    GamersLevelsComponent,
    GamersLevelDialogComponent
  ],
  entryComponents: [GamersLevelDialogComponent]
})
export class GamersLevelsModule {
}
