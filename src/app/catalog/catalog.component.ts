import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from '@angular/material';
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

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private cashReleaseRequestsService: CashReleaseRequestsService,
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
      this.apiService.get(
        this.routeData.apiUrl + (
          (this.routeData.apiUrl === '/report' || this.routeData.apiUrl === '/admin/financial/report') ? '?start=2019-05-05' : ''
        ),
      ).subscribe((res: any) => {
        if (!environment.production) {
          console.log(res);
        }
        if (this.routeData.apiUrl === '/admin/financial/report') {
          const pageArray = [];
          let i = 0;
          for (const item in res) {
            if (res.hasOwnProperty(item)) {
              pageArray.push(res[item]);
              pageArray[i].date = item;
              i++;
            }
          }
          this.subject$.next(pageArray.map(data => new this.routeData.model(data)));
        } else {
          if (this.routeUrl === 'gaming-accounts') {
            this.subject$.next((res.docs ? res.docs : res)
              .filter(data => data.role === 'player')
              .map(data => new this.routeData.model(data)));
          } else if (this.routeUrl === 'users') {
            this.subject$.next((res.docs ? res.docs : res)
              .filter(data => data.role !== 'player')
              .map(data => new this.routeData.model(data)));
          } else {
            this.subject$.next((res.docs ? res.docs : res).map(data => new this.routeData.model(data)));
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
    }).afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.getData();
      }
    });
  }

  gotoGamingAccount(id) {
    this.router.navigate(['gaming-accounts/', id]);
  }

  approveRequest(id) {
    this.dialog.open(CashReleaseRequestAcceptDialogComponent, {
      disableClose: false,
      data: id,
    }).afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.getData();
      }
    });
  }

  delete(id) {
    this.subscriptions.add(
      this.apiService.delete(this.routeData.apiUrl + '/' + id).subscribe((response: any) => {
        this.getData();
        this.snackBar.open('Удалено');
      }, (error: any) => {
        this.snackBar.open(error.message);
      }),
    );
  }
}

@Component({
  selector: 'fury-cash-release-request-decline-component',
  template: `
    <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
      <div>Одобрить выплату</div>
      <button type="button" mat-icon-button (click)="close()" tabindex="-1">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <mat-dialog-content>
      <p>Вы уверенны что хотите одобрить данную заявку?</p>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-raised-button color="primary" (click)="accept()">Одобрить</button>
      <button mat-raised-button color="basic" (click)="close()">Отклонить</button>
    </mat-dialog-actions>
  `,
})
export class CashReleaseRequestAcceptDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CashReleaseRequestAcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private cashReleaseRequestsService: CashReleaseRequestsService,
  ) {
  }

  accept(): void {
    this.cashReleaseRequestsService.approveRequest(this.data, true).subscribe(res => {
      this.dialogRef.close('reload');
      this.snackBar.open('Запрос одобрен');
    }, error => {
      this.snackBar.open(error.message);
    });
  }

  close() {
    this.dialogRef.close();
  }

}
