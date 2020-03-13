import { Country } from './country.model';
import { CountryDialogComponent } from './country-dialog.component';

export const countriesRouteData = {
  heading: 'Страны',
  addCaption: 'страну',
  apiUrl: '/countries',
  model: Country,
  dialog: CountryDialogComponent,
  furyListColumns: [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'flag', property: 'flag', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'code', property: 'code', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ]
};
