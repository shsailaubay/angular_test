export class PushNotification {
  text: string;
  type: number;
  rating: number;
  status: number;
  region: number;
  country: number;

  constructor(c) {
    this.text = c.text;
    this.type = c.type;
    this.rating = c.rating;
    this.status = c.status;
    this.region = c.region;
    this.country = c.country;
  }
}
