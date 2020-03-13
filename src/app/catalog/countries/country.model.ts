export class Country {
  _id: string;
  name_ru: string;
  name_en: string;
  flag: string;
  code: string;

  constructor(c) {
    this._id = c._id;
    this.name_ru = c.name.ru;
    this.name_en = c.name.en;
    this.flag = c.flag;
    this.code = c.code;
  }
}
