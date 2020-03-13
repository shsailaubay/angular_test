import { GamingMode } from './gaming-mode.model';
import { GamingModeDialogComponent } from './gaming-mode-dialog.component';

export const gamingModesRouteData = {
  heading: 'Игровые режимы',
  addCaption: 'игровой режим',
  apiUrl: '/game_options',
  model: GamingMode,
  dialog: GamingModeDialogComponent,
  furyListColumns: [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'description', property: 'description_ru', visible: true, isModelProperty: true},
    {name: 'description', property: 'description_en', visible: true, isModelProperty: true},
    {name: 'tag', property: 'slug', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ]
};
