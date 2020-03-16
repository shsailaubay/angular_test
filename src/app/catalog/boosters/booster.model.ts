export class Booster {
  _id: string;
  image: string;
  name_ru: string;
  name_en: string;
  game_name_ru: string;
  game_name_en: string;
  game_id: string;
  silver: number;
  gold: number;

  constructor(c) {
    this._id = c._id;
    this.image = c.image;
    this.name_ru = c.name.ru;
    this.name_en = c.name.en;
    this.game_name_ru = c.game.name.ru;
    this.game_name_en = c.game.name.en;
    this.game_id = c.game._id;
    this.silver = c.silver;
    this.gold = c.gold;
  }
}
