export class Country {
  _id: string;
  name: string;
  flag: string;
  code: string;

  constructor(c) {
    this._id = c._id;
    this.name = c.name.ru;
    this.flag = c.flag;
    this.code = c.code;
  }
}
