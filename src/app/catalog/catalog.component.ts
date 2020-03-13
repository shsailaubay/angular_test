import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

import { ListColumn } from '../../@fury/shared/list/list-column.model';
import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';

import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fury-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class CatalogComponent implements OnInit {

  loading = true;

  routeUrl = this.route.snapshot.url[0].path;
  routeData = this.route.snapshot.data;

  Model = this.routeData.model;

  baseUrl = environment.backend;

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  data: any[];

  dataSource: MatTableDataSource<any> | null;

  @Input()
  columns: ListColumn[] = this.routeData.furyListColumns as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private apiService: ApiService,
  ) {
    dialog.afterAllClosed.subscribe(() => {
      this.getData();
    });
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {

    this.loading = true;

    this.subject$ = new ReplaySubject<any[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];

    this.dataSource = null;

    this.apiService.get(this.routeData.apiUrl).subscribe((page: any) => {
      console.log(123, page);
      this.subject$.next((page.docs ? page.docs : page).map(data => new this.routeData.model(data)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((data) => {
        this.data = data;
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
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

  openDialog(data = null) {
    this.dialog.open(this.routeData.dialog, {
      disableClose: false,
      width: '450px',
      data: data
    });
  }

  delete(id) {
    this.apiService.delete(this.routeData.apiUrl + '/' + id).subscribe((response: any) => {
      this.getData();
    }, (response: any) => {
      console.log(response);
    });
  }
}
