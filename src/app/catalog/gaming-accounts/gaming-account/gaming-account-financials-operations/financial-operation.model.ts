export class FinancialOperation {
  date: string;
  type: string;
  amount: number;
  status: string;

  constructor(financialOperation) {
    this.date = financialOperation.date;
    this.type = financialOperation.operationType;
    this.amount = financialOperation.amount;
    this.status = financialOperation.status;
  }
}
