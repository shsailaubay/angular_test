import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CashReleaseRequestsComponent} from './cash-release-requests.component';

const routes: Routes = [
  {
    path: '',
    component: CashReleaseRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CashReleaseRequestsRoutingModule {
}
