export class GamersLevel {
  _id: string;
  name_ru: string;
  name_en: string;
  min: number;
  max: number;

  constructor(c) {
    this._id = c._id;
    this.name_ru = c.name.ru;
    this.name_en = c.name.en;
    this.min = c.min;
    this.max = c.max;
  }
}
