export class Action {
  region: number;
  country: number;
  game: number;
  name_ru: string;
  name_en: string;
  dateTo: string;
  type: number;
  conditions: string;
  image: string;
  reward: number;
  status: number;

  constructor(gameHistory) {
    this.region = gameHistory.region;
    this.country = gameHistory.country;
    this.game = gameHistory.game;
    this.name_ru = gameHistory.title.ru;
    this.name_en = gameHistory.title.en;
    this.dateTo = gameHistory.endDate;
    this.type = gameHistory.type;
    this.conditions = gameHistory.conditions;
    this.image = gameHistory.image;
    this.reward = gameHistory.freeSilvers ? gameHistory.freeSilvers : gameHistory.freeGold;
    this.status = gameHistory.status;
  }
}
