import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PushNotificationsComponent} from './push-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: PushNotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PushNotificationsRoutingModule {
}
