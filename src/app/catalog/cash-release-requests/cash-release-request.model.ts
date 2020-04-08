export class CashReleaseRequest {
  id: string;
  name: string;
  amount: number;
  cashOutType: string;
  status: number;

  constructor(crr) {
    this.id = crr.id;
    this.name = crr.user;
    this.amount = crr.amount;
    this.cashOutType = crr.cashOutType ? 'AdvCash' : 'PayPal';
    this.status = crr.status;
  }
}
