import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GamingCurrencyRatesComponent} from './gaming-currency-rates.component';

const routes: Routes = [
  {
    path: '',
    component: GamingCurrencyRatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamingCurrencyRatesRoutingModule {
}
