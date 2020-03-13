import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GamersLevelsComponent} from './gamers-levels.component';

const routes: Routes = [
  {
    path: '',
    component: GamersLevelsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamersLevelsRoutingModule {
}
