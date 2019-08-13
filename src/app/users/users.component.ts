import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {User} from './user.model';
import {USERS_DEMO_DATA} from './users.demo';

@Component({
  selector: 'fury-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  users: User[];

  dataSource: MatTableDataSource<User> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Checkbox', property: 'checkbox', visible: true},
    {name: 'Id', property: 'id', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'Email', property: 'email', visible: true, isModelProperty: true},
    {name: 'Phone', property: 'phone', visible: true, isModelProperty: true},
    {name: 'Role', property: 'role', visible: true, isModelProperty: true},
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
    return of(USERS_DEMO_DATA.map(u => new User(u)));
  }

  ngOnInit() {

    this.getData().subscribe(u => {
      this.subject$.next(u);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((u) => {
      this.users = u;
      this.dataSource.data = u;
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
    this.dialog.open(UserAddDialogComponent, {
      disableClose: false,
      width: '640px'
    });
  }
}

@Component({
  selector: 'fury-user-add-dialog-component',
  templateUrl: './user-add-dialog.component.html',
})
export class UserAddDialogComponent {
  constructor(private dialogRef: MatDialogRef<UserAddDialogComponent>) {
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
