import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FinancialHistoryService } from '../financial-history.service';
import { FinancialHistoryPurchases } from './financial-history-purchases.model';

@Component({
  selector: 'fury-financial-history-purchases',
  templateUrl: './financial-history-purchases.component.html',
  styles: []
})
export class FinancialHistoryPurchasesComponent implements OnInit, OnDestroy {

  loading = true;

  subscriptions: Subscription = new Subscription();

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  data: any[];

  dataSource: MatTableDataSource<any> | null;

  @Input()
  columns: ListColumn[] = [
    { name: 'User ID', property: 'userId', visible: true, isModelProperty: true },
    { name: 'Время', property: 'time', visible: true, isModelProperty: true },
  ] as ListColumn[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private financialHistoryService: FinancialHistoryService,
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  getData() {
    this.loading = true;

    this.subject$ = new ReplaySubject<any[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];

    this.dataSource = null;

    this.subscriptions.add(
      this.financialHistoryService.getData().subscribe((res: any) => {
        console.log(res);
        this.subject$.next(res.map(data => new FinancialHistoryPurchases(data)));

        this.dataSource = new MatTableDataSource();
        this.data$.pipe(
          filter(Boolean),
        ).subscribe((data) => {
          this.data = data;
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        });
      }),
    );
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
