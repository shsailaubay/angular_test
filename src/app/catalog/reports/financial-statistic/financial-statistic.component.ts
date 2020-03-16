import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {FinancialReport} from '../financial-report.model';
import {ReportsService} from '../reports.service';

@Component({
  selector: 'fury-financial-statistic',
  templateUrl: './financial-statistic.component.html',
  styleUrls: ['./financial-statistic.component.scss']
})
export class FinancialStatisticComponent implements OnInit {

  subject$: ReplaySubject<FinancialReport[]> = new ReplaySubject<FinancialReport[]>(1);
  data$: Observable<FinancialReport[]> = this.subject$.asObservable();
  data: FinancialReport[];

  dataSource: MatTableDataSource<FinancialReport> | null;

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
    this.subject$ = new ReplaySubject<FinancialReport[]>(1);
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

      console.log('pageArray', pageArray);

      this.subject$.next(pageArray.map(data => new FinancialReport(data)));
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
