export class FinancialOperation {
  date: string;
  type: number;
  amount: number;
  silver: number;
  gold: number;
  status: string;

  constructor(financialOperation) {
    this.date = financialOperation.date;
    this.type = financialOperation.type;
    this.amount = financialOperation.amount;
    this.silver = financialOperation.silver;
    this.gold = financialOperation.gold;
    this.status = financialOperation.status;
  }
}
