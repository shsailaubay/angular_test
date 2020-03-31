export class Report {
  region: string;
  newPlayersCount: number;
  newChairsCount: number;
  playedGamesCount: number;
  themeSoldCount: number;
  themeSoldSum: number;
  replenishmentCount: number;
  replenishmentSum: number;
  withdrawCount: number;
  withdrawCountSum: number;

  constructor(c) {
    this.region = c.region.ru;
    this.newPlayersCount = c.newPlayersCount;
    this.newChairsCount = c.newChairsCount;
    this.playedGamesCount = c.playedGamesCount;
    this.themeSoldCount = c.themeSoldCount;
    this.themeSoldSum = c.themeSoldSum;
    this.replenishmentCount = c.replenishmentCount;
    this.replenishmentSum = c.replenishmentSum;
    this.withdrawCount = c.withdrawCount;
    this.withdrawCountSum = c.withdrawCountSum;
  }
}
