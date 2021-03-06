export class Action {
  _id: string;
  // region: number;
  country_id: string;
  country: string;
  image: string;
  name_ru: string;
  name_en: string;
  message_ru: string;
  message_en: string;
  startDate: string;
  endDate: string;
  // game: number;
  // type: number;
  // conditions: string;
  freeSilvers: number;
  freeGold: number;
  actionPrice: number;
  active: boolean;
  repeatEveryDay: boolean;

  constructor(gameHistory) {
    this._id = gameHistory._id;
    // this.region = gameHistory.region;
    this.country_id = gameHistory.country && gameHistory.country._id || '';
    this.country = gameHistory.country &&  gameHistory.country.name && gameHistory.country.name.ru || '';
    // this.game = gameHistory.game;
    this.name_ru = gameHistory.title && gameHistory.title.ru;
    this.name_en = gameHistory.title && gameHistory.title.en;
    this.message_ru = gameHistory.successMessage && gameHistory.successMessage.ru;
    this.message_en = gameHistory.successMessage && gameHistory.successMessage.en;
    this.startDate = gameHistory.startDate;
    this.endDate = gameHistory.endDate;
    // this.type = gameHistory.type;
    // this.conditions = gameHistory.conditions;
    this.image = gameHistory.image;
    this.freeSilvers = gameHistory.freeSilvers;
    this.freeGold = gameHistory.freeGold;
    this.actionPrice = gameHistory.actionPrice;
    this.active = gameHistory.active;
    this.repeatEveryDay = gameHistory.repeatEveryDay;
  }
}
