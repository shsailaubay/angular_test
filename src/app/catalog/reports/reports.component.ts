import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {ReportsService} from './reports.service';
import {Report} from '../report/report.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'fury-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  filterStartDate = new FormControl(new Date().toISOString());

  subject$: ReplaySubject<Report[]> = new ReplaySubject<Report[]>(1);
  data$: Observable<Report[]> = this.subject$.asObservable();
  data: Report[];

  dataSource: MatTableDataSource<Report> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Регион', property: 'region', visible: true, isModelProperty: true},
    {name: 'Новых пользователей', property: 'newPlayersCount', visible: true, isModelProperty: true},
    {name: 'Созданных столов', property: 'newChairsCount', visible: true, isModelProperty: true},
    {name: 'Сыгранных игр', property: 'playedGamesCount', visible: true, isModelProperty: true},
    {name: 'Продано тем', property: 'themeSoldCount', visible: true, isModelProperty: true},
    {name: 'Сумма проданных тем', property: 'themeSoldSum', visible: true, isModelProperty: true},
    {name: 'Пополнений баланса', property: 'replenishmentCount', visible: true, isModelProperty: true},
    {name: 'Сумма пополнений баланса', property: 'replenishmentSum', visible: true, isModelProperty: true},
    {name: 'Выводов денег', property: 'withdrawCount', visible: true, isModelProperty: true},
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
    this.subject$ = new ReplaySubject<Report[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];
    this.dataSource = null;

    this.reportsService.getData().subscribe((page: any) => {
      this.subject$.next(page.map(data => new Report(data)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((data) => {
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

  setStartDate(e) {
    console.log(e);
    console.log(this.filterStartDate.value);
  }

}
