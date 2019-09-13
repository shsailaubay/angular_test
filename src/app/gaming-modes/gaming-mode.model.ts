export class GamingMode {
  _id: string;
  name_ru: string;
  name_en: string;
  description_ru: string;
  description_en: string;
  slug: string;

  constructor(c) {
    this._id = c._id;
    this.name_ru = c.name.ru;
    this.name_en = c.name.en;
    this.description_ru = c.description.ru;
    this.description_en = c.description.en;
    this.slug = c.slug;
  }
}
