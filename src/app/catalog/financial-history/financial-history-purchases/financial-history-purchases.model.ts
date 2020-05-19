export class FinancialHistoryPurchases {
  userId: string;
  time: string;

  constructor(c) {
    this.userId = c.user.ident;
    this.time = c.date;
  }
}
