import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { ListColumn } from '../../@fury/shared/list/list-column.model';
import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';

import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';
import { filter } from 'rxjs/operators';
import { STATUS_CODES } from './cash-release-requests/statusCodes';
import { CashReleaseRequestsService } from './cash-release-requests/cash-release-requests.service';

@Component({
  selector: 'fury-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class CatalogComponent implements OnInit, OnDestroy {

  loading = true;

  routeUrl = this.route.snapshot.url[0].path;
  routeData = this.route.snapshot.data;

  baseUrl = environment.backend;

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  data: any[];

  dataSource: MatTableDataSource<any> | null;

  subscriptions: Subscription = new Subscription();
  statusCodes = STATUS_CODES;

  @Input()
  columns: ListColumn[] = this.routeData.furyListColumns as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private apiService: ApiService,
    private cashReleaseRequestsService: CashReleaseRequestsService,
  ) {
    this.subscriptions.add(
      dialog.afterAllClosed.subscribe(() => {
        this.getData();
      }),
    );
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
      this.apiService.get(
        this.routeData.apiUrl + (
          (this.routeData.apiUrl === '/report' || this.routeData.apiUrl === '/admin/financial/report') ? '?start=2019-05-05' : ''
        )
      ).subscribe((page: any) => {
        if (this.routeData.apiUrl === '/admin/financial/report') {
          const pageArray = [];
          let i = 0;
          for (const item in page) {
            if (page.hasOwnProperty(item)) {
              pageArray.push(page[item]);
              pageArray[i].date = item;
              i++;
            }
          }
          this.subject$.next(pageArray.map(data => new this.routeData.model(data)));
        } else {
          if (this.routeUrl === 'gaming-accounts') {
            this.subject$.next((page.docs ? page.docs : page)
              .filter(data => data.role === 'player')
              .map(data => new this.routeData.model(data)));
          } else if (this.routeUrl === 'users') {
            this.subject$.next((page.docs ? page.docs : page)
              .filter(data => data.role !== 'player')
              .map(data => new this.routeData.model(data)));
          } else {
            this.subject$.next((page.docs ? page.docs : page).map(data => new this.routeData.model(data)));
          }
        }

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

  openDialog(data = null) {
    this.dialog.open(this.routeData.dialog, {
      disableClose: false,
      data: data,
    });
  }

  gotoGamingAccount(id) {
    this.router.navigate(['gaming-accounts/', id]);
  }

  approveRequest(id) {
    this.subscriptions.add(
      this.cashReleaseRequestsService.approveRequest(id, true).subscribe(res => this.getData(), error => console.log(error)),
    );
  }

  delete(id) {
    this.subscriptions.add(
      this.apiService.delete(this.routeData.apiUrl + '/' + id).subscribe((response: any) => {
        this.getData();
      }, (response: any) => {
        console.log(response);
      }),
    );
  }
}
