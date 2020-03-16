export class GamingCurrencyRate {
  date: string;
  time: string;
  gold: number;
  silver: number;

  constructor(gcr) {
    this.date = gcr.date;
    this.time = gcr.date;
    this.gold = gcr.gold;
    this.silver = gcr.silver;
  }
}
