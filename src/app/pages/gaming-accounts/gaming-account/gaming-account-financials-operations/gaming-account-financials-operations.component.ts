import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ListColumn} from '../../../../../@fury/shared/list/list-column.model';
import {Observable, of, ReplaySubject} from 'rxjs';
import {GameHistory} from '../../../../shared/models/financial-operation.model';
import {GAMES_HISTORY_DEMO_DATA} from '../../../../../assets/financials-operations.demo';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'fury-gaming-account-financials-operations',
  templateUrl: './gaming-account-financials-operations.component.html',
  styleUrls: ['./gaming-account-financials-operations.component.scss']
})

export class GamingAccountFinancialsOperationsComponent implements OnInit, AfterViewInit {

  subject$: ReplaySubject<GameHistory[]> = new ReplaySubject<GameHistory[]>(1);
  data$: Observable<GameHistory[]> = this.subject$.asObservable();
  financialOperations: GameHistory[];

  dataSource: MatTableDataSource<GameHistory> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Date', property: 'date', visible: true, isModelProperty: true},
    {name: 'Type', property: 'type', visible: true, isModelProperty: true},
    {name: 'Amount', property: 'amount', visible: true, isModelProperty: true},
    {name: 'Silver', property: 'silver', visible: true, isModelProperty: true},
    {name: 'Gold', property: 'gold', visible: true, isModelProperty: true},
    {name: 'Status', property: 'status', visible: true, isModelProperty: true},
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
      this.financialOperations = fo;
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
