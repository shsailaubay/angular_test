import { GamersLevel } from './gamers-level.model';
import { GamersLevelDialogComponent } from './gamers-level-dialog.component';

export const gamersLevelsRouteData = {
  heading: 'Уровни игроков',
  addCaption: 'уровень игроков',
  apiUrl: '/levels',
  model: GamersLevel,
  dialog: GamersLevelDialogComponent,
  furyListColumns: [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'Min', property: 'min', visible: true, isModelProperty: true},
    {name: 'Max', property: 'max', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ]
};
