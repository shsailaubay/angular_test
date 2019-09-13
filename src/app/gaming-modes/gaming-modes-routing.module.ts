import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GamingModesComponent} from './gaming-modes.component';

const routes: Routes = [
  {
    path: '',
    component: GamingModesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamingModesRoutingModule {
}
