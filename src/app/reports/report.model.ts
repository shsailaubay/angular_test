export class Report {
  _id: string;
  region: string;
  new_users: number;
  tables_created: number;
  games_played: number;
  themes_sold: number;
  themes_sold_amount: number;
  balances_paid: number;
  balances_paid_amount: number;
  money_exports: number;
  money_exports_amount: number;

  constructor(c) {
    this._id = c._id;
    this.region = c.region;
    this.new_users = c.new_users;
    this.tables_created = c.tables_created;
    this.games_played = c.games_played;
    this.themes_sold = c.themes_sold;
    this.themes_sold_amount = c.themes_sold_amount;
    this.balances_paid = c.balances_paid;
    this.balances_paid_amount = c.balances_paid_amount;
    this.money_exports = c.money_exports;
    this.money_exports_amount = c.money_exports_amount;
  }
}
