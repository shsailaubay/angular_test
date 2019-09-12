export class Game {
  _id: string;
  name_ru: string;
  name_en: string;
  link: string;
  image: string;
  icon: string;

  constructor(c) {
    this._id = c._id;
    this.name_ru = c.name.ru;
    this.name_en = c.name.en;
    this.link = c['link'];
    this.image = c.image;
    this.icon = c.icon;
  }
}
