import { GameDialogComponent } from './game-dialog.component';
import { Game } from './game.model';

export const gamesRouteData = {
  heading: 'Игры',
  addCaption: 'игру',
  apiUrl: '/games',
  model: Game,
  dialog: GameDialogComponent,
  furyListColumns: [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'icon', property: 'icon', visible: true, isModelProperty: true},
    {name: 'image', property: 'image', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'Description', property: 'description_ru', visible: true, isModelProperty: true},
    {name: 'Description', property: 'description_en', visible: true, isModelProperty: true},
    {name: 'link', property: 'link', visible: true, isModelProperty: true},
    {name: 'gaming_modes', property: 'allowedOptions', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ]
};
