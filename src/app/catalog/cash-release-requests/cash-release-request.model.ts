export class CashReleaseRequest {
  id: string;
  name: string;
  gold: number;
  amount: number;
  status: number;

  constructor(crr) {
    this.id = crr.id;
    this.name = crr.user;
    this.gold = crr.gold;
    this.amount = crr.amount;
    this.status = crr.status;
  }
}
