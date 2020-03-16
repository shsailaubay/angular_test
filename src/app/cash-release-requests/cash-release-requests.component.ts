import {Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

import {CashReleaseRequest} from './cash-release-request.model';
import {CashReleaseRequestsService} from './cash-release-requests.service';
import {STATUS_CODES} from './statusCodes';

@Component({
  selector: 'fury-cash-release-requests',
  templateUrl: './cash-release-requests.component.html',
  styleUrls: ['./cash-release-requests.component.scss']
})

export class CashReleaseRequestsComponent implements OnInit, OnDestroy {

  subject$: ReplaySubject<CashReleaseRequest[]> = new ReplaySubject<CashReleaseRequest[]>(1);
  data$: Observable<CashReleaseRequest[]> = this.subject$.asObservable();
  data: CashReleaseRequest[];

  dataSource: MatTableDataSource<CashReleaseRequest> | null;
  subscriptions: Subscription = new Subscription();
  statusCodes = STATUS_CODES;

  @Input()
  columns: ListColumn[] = [
    {name: 'Checkbox', property: 'checkbox', visible: true},
    {name: 'Id', property: 'id', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'Gold', property: 'gold', visible: true, isModelProperty: true},
    {name: 'Amount', property: 'amount', visible: true, isModelProperty: true},
    {name: 'Status', property: 'status', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private dialog: MatDialog,
    private cashReleaseRequestsService: CashReleaseRequestsService
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  getData() {
    this.subject$ = new ReplaySubject<CashReleaseRequest[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];
    this.dataSource = null;

    this.subscriptions.add(
      this.cashReleaseRequestsService.getData().subscribe((page: any) => {
        this.subject$.next(page.docs.map(data => new CashReleaseRequest(data)));
        this.dataSource = new MatTableDataSource();
        this.data$.pipe(
          filter(Boolean)
        ).subscribe((data) => {
          this.data = data;
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      })
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

  approveRequest(id) {
    this.subscriptions.add(
      this.cashReleaseRequestsService.approveRequest(id, true).subscribe(
        res => this.getData(), error => console.log(error)
      )
    );
  }

  openDialog(id) {
    this.dialog.open(CashReleaseRequestDeclineComponent, {
      disableClose: false,
      width: '450px',
      data: id
    });
  }
}

@Component({
  selector: 'fury-cash-release-request-decline-component',
  templateUrl: './cash-release-request-decline.component.html',
})
export class CashReleaseRequestDeclineComponent implements OnDestroy {
  subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<CashReleaseRequestDeclineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cashReleaseRequestsService: CashReleaseRequestsService
  ) {
    console.log(this.data);
  }

  decline() {
    this.subscription = this.cashReleaseRequestsService.approveRequest(this.data, false).subscribe(
      () => {
        this.dialogRef.close();
      },
      error => {
        console.log(error);
        this.dialogRef.close();
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
