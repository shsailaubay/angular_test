import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../../../@fury/shared/list/list-column.model';

import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {FinancialOperation} from './financial-operation.model';
import {FINANCIAL_OPERATIONS_DEMO_DATA} from './financials-operations.demo';

@Component({
  selector: 'fury-gaming-account-financials-operations',
  templateUrl: './gaming-account-financials-operations.component.html',
  styleUrls: ['./gaming-account-financials-operations.component.scss']
})

export class GamingAccountFinancialsOperationsComponent implements OnInit, AfterViewInit {

  subject$: ReplaySubject<FinancialOperation[]> = new ReplaySubject<FinancialOperation[]>(1);
  data$: Observable<FinancialOperation[]> = this.subject$.asObservable();
  financialOperations: FinancialOperation[];

  dataSource: MatTableDataSource<FinancialOperation> | null;

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
    return of(FINANCIAL_OPERATIONS_DEMO_DATA.map(fo => new FinancialOperation(fo)));
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
