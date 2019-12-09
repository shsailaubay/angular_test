import * as moment from 'moment';

export class GamingCurrencyRate {
  date: string;
  time: string;
  gold: number;

  constructor(gcr) {
    this.date = gcr.date;
    this.time = gcr.date;
    this.gold = gcr.gold;
  }
}
