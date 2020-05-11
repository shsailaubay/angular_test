export class FinancialHistoryPurchases {
  userId: string;
  time: string;

  constructor(c) {
    this.userId = c.userId;
    this.time = c.time;
  }
}
