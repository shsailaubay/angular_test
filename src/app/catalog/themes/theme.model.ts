export class Theme {
  _id: string;
  name_ru: string;
  name_en: string;
  image: string;
  price: number;
  is_buy: number;

  constructor(c) {
    this._id = c._id;
    this.name_ru = c.name.ru;
    this.name_en = c.name.en;
    this.image = c.image;
    this.price = c.price;
    this.is_buy = c.is_buy;
  }
}
