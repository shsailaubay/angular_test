import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {ListColumn} from '../../../@fury/shared/list/list-column.model';

import {CashReleaseRequest} from '../../shared/models/cash-release-request.model';
import {CASH_RELEASE_REQUESTS_DEMO_DATA} from '../../../assets/cash-release-requests.demo';

@Component({
  selector: 'fury-cash-release-requests',
  templateUrl: './cash-release-requests.component.html',
  styleUrls: ['./cash-release-requests.component.scss']
})

export class CashReleaseRequestsComponent implements OnInit, AfterViewInit {

  subject$: ReplaySubject<CashReleaseRequest[]> = new ReplaySubject<CashReleaseRequest[]>(1);
  data$: Observable<CashReleaseRequest[]> = this.subject$.asObservable();
  cashReleaseRequests: CashReleaseRequest[];

  dataSource: MatTableDataSource<CashReleaseRequest> | null;

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
    private dialog: MatDialog
  ) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(CASH_RELEASE_REQUESTS_DEMO_DATA.map(crr => new CashReleaseRequest(crr)));
  }

  ngOnInit() {
    this.getData().subscribe(crr => {
      this.subject$.next(crr);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((crr) => {
      this.cashReleaseRequests = crr;
      this.dataSource.data = crr;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  openDialog() {
    this.dialog.open(CashReleaseRequestDeclineComponent, {
      disableClose: false,
      width: '450px'
    });
  }
}

@Component({
  selector: 'fury-cash-release-request-decline-component',
  templateUrl: './cash-release-request-decline.component.html',
})
export class CashReleaseRequestDeclineComponent {
  constructor(private dialogRef: MatDialogRef<CashReleaseRequestDeclineComponent>) {
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
