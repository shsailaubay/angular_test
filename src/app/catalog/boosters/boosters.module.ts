import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ListModule } from '../../../@fury/shared/list/list.module';

import { BoostersRoutingModule } from './boosters-routing.module';
import { BoostersComponent } from './boosters.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BoostersRoutingModule,
    FurySharedModule,
    ListModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    BoostersComponent,
  ],
})
export class BoostersModule {
}
