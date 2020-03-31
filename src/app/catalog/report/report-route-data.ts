import { Report } from './report.model';

export const reportRouteData = {
  heading: 'Отчет по финансам',
  apiUrl: '/report',
  model: Report,
  furyListColumns: [
    {name: 'Регион', property: 'region', visible: true, isModelProperty: true},
    {name: 'Новых пользователей', property: 'newPlayersCount', visible: true, isModelProperty: true},
    {name: 'Созданных столов', property: 'newChairsCount', visible: true, isModelProperty: true},
    {name: 'Сыгранных игр', property: 'playedGamesCount', visible: true, isModelProperty: true},
    {name: 'Продано тем', property: 'themeSoldCount', visible: true, isModelProperty: true},
    {name: 'Сумма проданных тем', property: 'themeSoldSum', visible: true, isModelProperty: true},
    {name: 'Пополнений баланса', property: 'replenishmentCount', visible: true, isModelProperty: true},
    {name: 'Сумма пополнений баланса', property: 'replenishmentSum', visible: true, isModelProperty: true},
    {name: 'Выводов денег', property: 'withdrawCount', visible: true, isModelProperty: true},
    {name: 'Сумма выводов денег', property: 'withdrawCountSum', visible: true, isModelProperty: true},
  ]
};
