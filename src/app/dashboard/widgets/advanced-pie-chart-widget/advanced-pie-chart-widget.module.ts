import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { LoadingOverlayModule } from '../../../../@fury/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../../@fury/shared/scrollbar/scrollbar.module';
import { AdvancedPieChartWidgetComponent } from './advanced-pie-chart-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    FuryCardModule,
    LoadingOverlayModule,
    ScrollbarModule
  ],
  declarations: [AdvancedPieChartWidgetComponent],
  exports: [AdvancedPieChartWidgetComponent]
})
export class AdvancedPieChartWidgetModule {
}