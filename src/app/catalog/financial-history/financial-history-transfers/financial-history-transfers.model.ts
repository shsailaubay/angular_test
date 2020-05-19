export class FinancialHistoryTransfers {
  type: string;
  userId: string;
  time: string;
  userIdRecipient: string;

  constructor(c) {
    this.type = c.operationType;
    this.userId = c.user.ident;
    this.time = c.date;
    this.userIdRecipient = c.replenishing.ident;
  }
}
