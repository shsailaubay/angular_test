import { Action } from './action.model';
import { ActionDialogComponent } from './action-dialog.component';

export const actionsRouteData = {
  heading: 'Акции',
  addCaption: 'акцию',
  apiUrl: '/actions',
  model: Action,
  dialog: ActionDialogComponent,
  furyListColumns: [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'country_id', property: 'country_id', visible: false, isModelProperty: true},
    {name: 'country', property: 'country', visible: true, isModelProperty: true},
    {name: 'image', property: 'image', visible: true, isModelProperty: true},
    // {name: 'Region', property: 'region', visible: true, isModelProperty: true},
    // {name: 'game', property: 'game', visible: true, isModelProperty: true},
    {name: 'name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'message', property: 'message_ru', visible: false, isModelProperty: true},
    {name: 'message', property: 'message_en', visible: false, isModelProperty: true},
    // {name: 'type', property: 'type', visible: true, isModelProperty: true},
    // {name: 'conditions', property: 'conditions', visible: true, isModelProperty: true},
    {name: 'freeSilvers', property: 'freeSilvers', visible: true, isModelProperty: true},
    {name: 'freeGold', property: 'freeGold', visible: true, isModelProperty: true},
    {name: 'actionPrice', property: 'actionPrice', visible: true, isModelProperty: true},
    {name: 'active', property: 'active', visible: true, isModelProperty: true},
    {name: 'startDate', property: 'startDate', visible: true, isModelProperty: true},
    {name: 'endDate', property: 'endDate', visible: true, isModelProperty: true},
    {name: 'repeatEveryDay', property: 'repeatEveryDay', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ]
};
