import { GamingCurrencyRateDialogComponent } from './gaming-currency-rate-dialog.component';
import { GamingCurrencyRate } from './gaming-currency-rate.model';

export const gamingCurrencyRatesRouteData = {
  heading: 'Курсы игровых валют',
  addCaption: 'курс игровой валюты',
  apiUrl: '/admin/exchange',
  model: GamingCurrencyRate,
  dialog: GamingCurrencyRateDialogComponent,
  furyListColumns: [
    {name: 'Time', property: 'date', visible: true, isModelProperty: true},
    {name: 'Silver', property: 'silver', visible: true, isModelProperty: true},
    {name: 'Gold', property: 'gold', visible: true, isModelProperty: true},
  ]
};
