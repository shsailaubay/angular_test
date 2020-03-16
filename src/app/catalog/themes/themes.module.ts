import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesComponent } from './themes.component';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { ListModule } from '../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ThemesRoutingModule,
    FurySharedModule,
    ListModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    ThemesComponent,
  ],
})
export class ThemesModule {
}
