import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {FinancialStatistic} from '../../financial-statistic/financial-statistic.model';
import {ReportsService} from '../reports.service';

@Component({
  selector: 'fury-financial-statistic',
  templateUrl: './financial-statistic.component.html',
  styleUrls: ['./financial-statistic.component.scss']
})
export class FinancialStatisticComponent implements OnInit {

  subject$: ReplaySubject<FinancialStatistic[]> = new ReplaySubject<FinancialStatistic[]>(1);
  data$: Observable<FinancialStatistic[]> = this.subject$.asObservable();
  data: FinancialStatistic[];

  dataSource: MatTableDataSource<FinancialStatistic> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Страна', property: 'country', visible: true, isModelProperty: true},
    {name: 'Дата', property: 'date', visible: true, isModelProperty: true},
    {name: 'Сумма пополнений баланса', property: 'replenishmentSum', visible: true, isModelProperty: true},
    {name: 'Сумма выводов денег', property: 'withdrawCountSum', visible: true, isModelProperty: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private reportsService: ReportsService
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.subject$ = new ReplaySubject<FinancialStatistic[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];
    this.dataSource = null;

    this.reportsService.getReports().subscribe((page: any) => {

      const pageArray = [];

      let i = 0;
      for (const item in page) {
        if (page.hasOwnProperty(item)) {
          console.log(item, page[item]);
          pageArray.push(page[item]);
          pageArray[i].date = item;
          i++;
        }
      }

      this.subject$.next(pageArray.map(data => new FinancialStatistic(data)));

      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((data) => {
        console.log(data);
        this.data = data;
        this.dataSource.data = data;
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
