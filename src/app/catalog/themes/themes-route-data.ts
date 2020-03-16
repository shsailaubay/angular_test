import { Theme } from './theme.model';
import { ThemeDialogComponent } from './theme-dialog.component';

export const themesRouteData = {
  heading: 'Темы',
  addCaption: 'тему',
  apiUrl: '/themes',
  model: Theme,
  dialog: ThemeDialogComponent,
  furyListColumns: [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'image', property: 'image', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'Price', property: 'price', visible: true, isModelProperty: true},
    {name: 'Is buy', property: 'is_buy', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ]
};
