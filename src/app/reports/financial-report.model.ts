export class Report {
  country: string;
  date: string;
  replenishmentSum: string;
  withdrawCountSum: string;

  constructor(c) {
    this.country = c.country.ru;
    this.date = c.date;
    this.replenishmentSum = c.replenishmentSum;
    this.withdrawCountSum = c.withdrawCountSum;
  }
}
