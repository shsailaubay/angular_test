import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamingAccountsComponent} from './gaming-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: GamingAccountsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GamingAccountsRoutingModule {
}
