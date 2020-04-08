import { CashReleaseRequest } from './cash-release-request.model';
import { CashReleaseRequestDeclineComponent } from './cash-release-request-decline.component';

export const cashReleaseRequestsRouteData = {
  heading: 'Заявки на вывод денежных средств',
  apiUrl: '/admin/financial',
  model: CashReleaseRequest,
  dialog: CashReleaseRequestDeclineComponent,
  furyListColumns: [
    // {name: 'Checkbox', property: 'checkbox', visible: true},
    {name: 'Id', property: 'id', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'Amount', property: 'amount', visible: true, isModelProperty: true},
    {name: 'cashOutType', property: 'cashOutType', visible: true, isModelProperty: true},
    {name: 'Status', property: 'status', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ]
};
