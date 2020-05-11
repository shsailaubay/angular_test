import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FinancialHistoryService } from '../financial-history.service';
import { FinancialHistoryTransfers } from './financial-history-transfers.model';

@Component({
  selector: 'fury-financial-history-transfers',
  templateUrl: './financial-history-transfers.component.html',
  styles: [],
})
export class FinancialHistoryTransfersComponent implements OnInit, OnDestroy {

  loading = true;

  subscriptions: Subscription = new Subscription();

  @Input()
  columns: ListColumn[] = [
    { name: 'Тип операции', property: 'type', visible: true, isModelProperty: true },
    { name: 'User ID отправителя', property: 'userId', visible: true, isModelProperty: true },
    { name: 'Время', property: 'time', visible: true, isModelProperty: true },
    { name: 'User ID получателя', property: 'userIdRecipient', visible: true, isModelProperty: true },
  ] as ListColumn[];

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  data: any[];
  dataSource: MatTableDataSource<any> | null;
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
      this.financialHistoryService.get().subscribe((res: any) => {
        this.subject$.next((res.docs ? res.docs : res).map(data => new FinancialHistoryTransfers(data)));

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
