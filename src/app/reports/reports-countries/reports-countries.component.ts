import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Report} from '../report.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';

@Component({
  selector: 'fury-reports-countries',
  templateUrl: './reports-countries.component.html',
  styleUrls: ['./reports-countries.component.scss']
})
export class ReportsCountriesComponent implements OnInit {

  subject$: ReplaySubject<Report[]> = new ReplaySubject<Report[]>(1);
  data$: Observable<Report[]> = this.subject$.asObservable();
  data: Report[];

  dataSource: MatTableDataSource<Report> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'region', property: 'region', visible: true, isModelProperty: true},
    {name: 'new_users', property: 'new_users', visible: true, isModelProperty: true},
    {name: 'tables_created', property: 'tables_created', visible: true, isModelProperty: true},
    {name: 'games_played', property: 'games_played', visible: true, isModelProperty: true},
    {name: 'themes_sold', property: 'themes_sold', visible: true, isModelProperty: true},
    {name: 'themes_sold_amount', property: 'themes_sold_amount', visible: true, isModelProperty: true},
    {name: 'balances_paid', property: 'balances_paid', visible: true, isModelProperty: true},
    {name: 'balances_paid_amount', property: 'balances_paid_amount', visible: true, isModelProperty: true},
    {name: 'money_exports', property: 'money_exports', visible: true, isModelProperty: true},
    {name: 'money_exports_amount', property: 'money_exports_amount', visible: true, isModelProperty: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor() {
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

    // this.boostersService.getData().subscribe((page: any) => {
    //   this.subject$.next(page.map(data => new Report(data)));
    //   this.dataSource = new MatTableDataSource();
    //   this.data$.pipe(
    //     filter(Boolean)
    //   ).subscribe((data) => {
    //     this.data = data;
    //     this.dataSource.data = data;
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   });
    // });
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
