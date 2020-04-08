import * as moment from 'moment';

export class GameHistory {
  date: string;
  time: string;
  game: number;
  type: string;
  opponent: string;
  score: string;
  // duration: string;
  bids: string;

  constructor(gameHistory, playerId) {
    this.date = gameHistory.startedAt && (new Date(gameHistory.startedAt)).getDate() + '.' + ((new Date(gameHistory.startedAt)).getMonth() + 1) + '.' + (new Date(gameHistory.startedAt)).getFullYear();
    this.time = gameHistory.startedAt && (new Date(gameHistory.startedAt)).getHours() + ':' + (new Date(gameHistory.startedAt)).getMinutes() + ':' + (new Date(gameHistory.startedAt)).getSeconds();
    this.game = gameHistory.game && gameHistory.game.name && (gameHistory.game.name.ru || gameHistory.game.name.en);
    this.type = GAME_TYPES[gameHistory.gameType];
    this.opponent = gameHistory.playerCreated && gameHistory.playerConnected ?
      (gameHistory.playerCreated._id === playerId ? gameHistory.playerConnected._id : gameHistory.playerCreated._id) : '';
    this.score = gameHistory.score;
    this.bids = gameHistory.bet;
  }
}

const GAME_TYPES = {
  1: 'With friend',
  2: 'Random',
};
