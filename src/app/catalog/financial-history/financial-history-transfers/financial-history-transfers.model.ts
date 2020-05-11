export class FinancialHistoryTransfers {
  type: number;
  userId: string;
  time: string;
  userIdRecipient: string;

  constructor(c) {
    this.type = c.type;
    this.userId = c.userId;
    this.time = c.time;
    this.userIdRecipient = c.userIdRecipient;
  }
}
