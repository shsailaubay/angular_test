export class GameHistory {
  date: string;
  time: string;
  game: number;
  type: number;
  opponent: number;
  score: string;
  duration: number;
  bids: string;

  constructor(gameHistory) {
    this.date = gameHistory.date;
    this.time = gameHistory.time;
    this.game = gameHistory.game;
    this.type = gameHistory.type;
    this.opponent = gameHistory.opponent;
    this.score = gameHistory.score;
    this.duration = gameHistory.duration;
    this.bids = gameHistory.bids;
  }
}
