import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamingAccountsComponent} from './gaming-accounts.component';
import {GamingAccountComponent} from './gaming-account/gaming-account.component';


const routes: Routes = [
  {
    path: '',
    component: GamingAccountsComponent
  },
  {
    path: ':id',
    component: GamingAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GamingAccountsRoutingModule {
}
