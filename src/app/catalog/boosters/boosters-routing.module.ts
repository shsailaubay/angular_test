import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BoostersComponent} from './boosters.component';

const routes: Routes = [
  {
    path: '',
    component: BoostersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoostersRoutingModule {
}
