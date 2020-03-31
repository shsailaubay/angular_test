import { FinancialStatistic } from './financial-statistic.model';

export const financialStatisticRouteData = {
  heading: 'Отчет по финансам',
  apiUrl: '/admin/financial/report',
  model: FinancialStatistic,
  furyListColumns: [
    {name: 'Страна', property: 'country', visible: true, isModelProperty: true},
    {name: 'Дата', property: 'date', visible: true, isModelProperty: true},
    {name: 'Сумма пополнений баланса', property: 'replenishmentSum', visible: true, isModelProperty: true},
    {name: 'Сумма выводов денег', property: 'withdrawCountSum', visible: true, isModelProperty: true},
  ]
};
