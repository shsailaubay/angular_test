export class PushNotification {
  theme_ru: string;
  theme_en: string;
  body_ru: string;
  body_en: string;
  devices: number;
  rating: number;
  status: number;
  region: number;
  country: number;

  constructor(c) {
    this.theme_ru = c.theme.ru;
    this.theme_en = c.theme.en;
    this.body_ru = c.body.ru;
    this.body_en = c.body.en;
    this.devices = c.devices;
    this.rating = c.rating;
    this.status = c.status;
    this.region = c.region;
    this.country = c.country;
  }
}
