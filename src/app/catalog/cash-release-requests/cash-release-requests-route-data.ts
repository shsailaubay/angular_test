import { CashReleaseRequest } from './cash-release-request.model';

export const cashReleaseRequestsRouteData = {
  heading: 'Заявки на вывод денежных средств',
  apiUrl: '/admin/financial',
  model: CashReleaseRequest,
  furyListColumns: [
    // {name: 'Checkbox', property: 'checkbox', visible: true},
    {name: 'Id', property: 'id', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'Gold', property: 'gold', visible: true, isModelProperty: true},
    {name: 'Amount', property: 'amount', visible: true, isModelProperty: true},
    {name: 'Status', property: 'status', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ]
};
