import { GamingAccount } from './gaming-account.model';

export const gamingAccountsRouteData = {
  heading: 'Игровые аккаунты',
  apiUrl: '/admin/users',
  model: GamingAccount,
  furyListColumns: [
    // {name: 'Checkbox', property: 'checkbox', visible: true},
    {name: 'Id', property: 'id', visible: true, isModelProperty: true},
    {name: 'Ident', property: 'ident', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'Social link', property: 'socialLink', visible: true, isModelProperty: true},
    {name: 'Email', property: 'email', visible: true, isModelProperty: true},
    {name: 'Exp Points', property: 'expPoints', visible: true, isModelProperty: true},
    {name: 'Silver', property: 'silver', visible: true, isModelProperty: true},
    {name: 'Gold', property: 'gold', visible: true, isModelProperty: true},
    {name: 'Player Status', property: 'playerStatus', visible: true, isModelProperty: true},
    {name: 'Last Visit', property: 'lastVisit', visible: true, isModelProperty: true},
  ]
};
