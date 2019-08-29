import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {ListColumn} from '../../../../@fury/shared/list/list-column.model';

import {GameHistory} from './game-history.model';
import {GamingAccountsService} from '../../gaming-accounts.service';

@Component({
  selector: 'fury-gaming-account-games-history',
  templateUrl: './gaming-account-games-history.component.html',
  styleUrls: ['./gaming-account-games-history.component.scss']
})

export class GamingAccountGamesHistoryComponent implements OnInit {
  gamingAccountId = this.route.snapshot.params['id'];

  subject$: ReplaySubject<GameHistory[]> = new ReplaySubject<GameHistory[]>(1);
  data$: Observable<GameHistory[]> = this.subject$.asObservable();
  gamesHistory: GameHistory[];

  dataSource: MatTableDataSource<GameHistory> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Date', property: 'date', visible: true, isModelProperty: true},
    {name: 'Time', property: 'time', visible: true, isModelProperty: true},
    {name: 'Game', property: 'game', visible: true, isModelProperty: true},
    {name: 'Type', property: 'type', visible: true, isModelProperty: true},
    {name: 'Opponent', property: 'opponent', visible: true, isModelProperty: true},
    {name: 'Score', property: 'score', visible: true, isModelProperty: true},
    {name: 'Duration', property: 'duration', visible: true, isModelProperty: true},
    {name: 'Bids', property: 'bids', visible: true, isModelProperty: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private route: ActivatedRoute,
    private gamingAccountsService: GamingAccountsService
  ) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.gamingAccountsService.getGamingAccountGamesHistory(this.gamingAccountId).subscribe((page: any) => {
      this.subject$.next(page.docs.map(gamesHistory => new GameHistory(gamesHistory)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((gamesHistory) => {
        this.gamesHistory = gamesHistory;
        this.dataSource.data = gamesHistory;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
}
