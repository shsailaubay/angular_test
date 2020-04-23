export class Game {
  _id: string;
  name_ru: string;
  name_en: string;
  description_ru: string;
  description_en: string;
  link: string;
  image: string;
  icon: string;
  allowedOptions: [];

  constructor(c) {
    this._id = c._id;
    this.name_ru = c.name.ru;
    this.name_en = c.name.en;
    this.description_ru = c.description.ru;
    this.description_en = c.description.en;
    this.link = c['link'];
    this.image = c.image;
    this.icon = c.icon;
    this.allowedOptions = c.allowedOptions.map(e => ' ' + e.name.ru);
  }
}
