import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {ListColumn} from '../../../../../@fury/shared/list/list-column.model';

import {GameHistory} from '../../../../shared/models/game-history.model';
import {GAMES_HISTORY_DEMO_DATA} from '../../../../../assets/games-history.demo';

@Component({
  selector: 'fury-gaming-account-games-history',
  templateUrl: './gaming-account-games-history.component.html',
  styleUrls: ['./gaming-account-games-history.component.scss']
})

export class GamingAccountGamesHistoryComponent implements OnInit, AfterViewInit {

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

  constructor() { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(GAMES_HISTORY_DEMO_DATA.map(fo => new GameHistory(fo)));
  }

  ngOnInit() {
    this.getData().subscribe(fo => {
      this.subject$.next(fo);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((fo) => {
      this.gamesHistory = fo;
      this.dataSource.data = fo;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
