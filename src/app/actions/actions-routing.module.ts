import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ActionsComponent} from './actions.component';
import {ActionAddComponent} from './action-add/action-add.component';

const routes: Routes = [
  {
    path: '',
    component: ActionsComponent
  },
  {
    path: 'add',
    component: ActionAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule {
}
