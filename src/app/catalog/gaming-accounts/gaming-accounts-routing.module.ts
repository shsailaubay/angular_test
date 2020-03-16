import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamingAccountComponent} from './gaming-account/gaming-account.component';

const routes: Routes = [
  {
    path: '',
    component: GamingAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamingAccountsRoutingModule {
}
