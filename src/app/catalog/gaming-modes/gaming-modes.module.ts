import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ListModule } from '../../../@fury/shared/list/list.module';

import { GamingModesRoutingModule } from './gaming-modes-routing.module';
import { GamingModesComponent } from './gaming-modes.component';
import { GamingModeDialogComponent } from './gaming-mode-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    GamingModesRoutingModule,
    FurySharedModule,
    MaterialModule,
    ListModule,
    ReactiveFormsModule
  ],
  declarations: [
    GamingModesComponent,
    GamingModeDialogComponent
  ],
  entryComponents: [GamingModeDialogComponent]
})
export class GamingModesModule {
}
