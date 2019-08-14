export class Country {
  name: string;
  flag: string;
  code: string;

  constructor(c) {
    this.name = c.name.ru;
    this.flag = c.flag;
    this.code = c.code;
  }
}
