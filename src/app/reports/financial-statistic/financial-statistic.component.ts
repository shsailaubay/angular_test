import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {ReportsService} from '../reports.service';
import {Report} from '../report.model';

@Component({
  selector: 'fury-financial-statistic',
  templateUrl: './financial-statistic.component.html',
  styleUrls: ['./financial-statistic.component.scss']
})
export class FinancialStatisticComponent implements OnInit {

  subject$: ReplaySubject<Report[]> = new ReplaySubject<Report[]>(1);
  data$: Observable<Report[]> = this.subject$.asObservable();
  data: Report[];

  dataSource: MatTableDataSource<Report> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'region', property: 'region', visible: true, isModelProperty: true},
    {name: 'newPlayersCount', property: 'newPlayersCount', visible: true, isModelProperty: true},
    {name: 'newChairsCount', property: 'newChairsCount', visible: true, isModelProperty: true},
    {name: 'playedGamesCount', property: 'playedGamesCount', visible: true, isModelProperty: true},
    {name: 'themeSoldCount', property: 'themeSoldCount', visible: true, isModelProperty: true},
    {name: 'themeSoldSum', property: 'themeSoldSum', visible: true, isModelProperty: true},
    {name: 'replenishmentCount', property: 'replenishmentCount', visible: true, isModelProperty: true},
    {name: 'replenishmentSum', property: 'replenishmentSum', visible: true, isModelProperty: true},
    {name: 'withdrawCount', property: 'withdrawCount', visible: true, isModelProperty: true},
    {name: 'withdrawCountSum', property: 'withdrawCountSum', visible: true, isModelProperty: true},
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

}
