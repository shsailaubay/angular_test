export class GamingAccount {
  id: string;
  name: string;
  social_link: string;
  email: string;
  exp_points: number;
  silver: number;
  gold: number;
  player_status: string;
  last_visit: string;

  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.social_link = customer.social_link;
    this.email = customer.email;
    this.exp_points = customer.exp_points;
    this.silver = customer.silver;
    this.gold = customer.gold;
    this.player_status = customer.player_status;
    this.last_visit = customer.last_visit;
  }
}
