export class GamingCurrencyRate {
  date: string;
  time: string;
  rate: number;

  constructor(gcr) {
    this.date = gcr.date;
    this.time = gcr.time;
    this.rate = gcr.rate;
  }
}
