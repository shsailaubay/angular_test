export class FinancialStatistic {
  country: string;
  date: string;
  replenishmentSum: string;
  withdrawCountSum: string;

  constructor(c) {
    this.country = c.country.name.ru;
    this.date = c.date;
    this.replenishmentSum = c.replenishmentSum;
    this.withdrawCountSum = c.withdrawCountSum;
  }
}
