import { Booster } from './booster.model';
import { BoosterDialogComponent } from './booster-dialog.component';

export const boostersRouteData = {
  heading: 'Бустеры',
  addCaption: 'бустер',
  apiUrl: '/boosters',
  model: Booster,
  dialog: BoosterDialogComponent,
  furyListColumns: [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'image', property: 'image', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'Game', property: 'game_name_ru', visible: true, isModelProperty: true},
    {name: 'Game', property: 'game_name_en', visible: true, isModelProperty: true},
    {name: 'silver', property: 'silver', visible: true, isModelProperty: true},
    {name: 'gold', property: 'gold', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ]
};
