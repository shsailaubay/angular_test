export class Action {
  region: number;
  country: number;
  game: number;
  name: string;
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
    this.dateTo = gameHistory.dateTo;
    this.type = gameHistory.type;
    this.conditions = gameHistory.conditions;
    this.image = gameHistory.image;
    this.reward = gameHistory.reward;
    this.status = gameHistory.status;
  }
}
