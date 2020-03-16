import { PushNotification } from './push-notification.model';
import { PushNotificationAddDialogComponent } from './push-notification-dialog.component';

export const pushNotificationsRouteData = {
  heading: 'Модуль отправки push-уведомлений',
  addCaption: 'уведомление',
  apiUrl: '/fcm',
  model: PushNotification,
  dialog: PushNotificationAddDialogComponent,
  furyListColumns: [
    {name: 'theme', property: 'theme_ru', visible: true, isModelProperty: true},
    {name: 'theme', property: 'theme_en', visible: true, isModelProperty: true},
    {name: 'body', property: 'body_ru', visible: true, isModelProperty: true},
    {name: 'body', property: 'body_en', visible: true, isModelProperty: true},
    {name: 'devices', property: 'devices', visible: true, isModelProperty: true},
    {name: 'rating', property: 'rating', visible: true, isModelProperty: true},
    {name: 'status', property: 'status', visible: true, isModelProperty: true},
    {name: 'region', property: 'region', visible: true, isModelProperty: true},
    {name: 'country', property: 'country', visible: true, isModelProperty: true},
  ],
};
