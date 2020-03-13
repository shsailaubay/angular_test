export class GamingAccount {
  id: string;
  name: string;
  socialLink: string;
  email: string;
  expPoints: number;
  silver: number;
  gold: number;
  playerStatus: string;
  lastVisit: string;

  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.socialLink = customer.socialLink;
    this.email = customer.email;
    this.expPoints = customer.expPoints;
    this.silver = customer.silver;
    this.gold = customer.gold;
    this.playerStatus = customer.expPointsDisplay;
    this.lastVisit = customer.lastVisit;
  }
}
