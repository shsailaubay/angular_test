import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {PushNotificationsService} from './push-notifications.service';
import {PushNotification} from './push-notification.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'fury-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss']
})
export class PushNotificationsComponent implements OnInit {

  subject$: ReplaySubject<PushNotification[]> = new ReplaySubject<PushNotification[]>(1);
  data$: Observable<PushNotification[]> = this.subject$.asObservable();
  pushNotifications: PushNotification[];

  dataSource: MatTableDataSource<PushNotification> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Checkbox', property: 'checkbox', visible: true},
    {name: 'theme', property: 'theme_ru', visible: true, isModelProperty: true},
    {name: 'theme', property: 'theme_en', visible: true, isModelProperty: true},
    {name: 'body', property: 'body_ru', visible: true, isModelProperty: true},
    {name: 'body', property: 'body_en', visible: true, isModelProperty: true},
    {name: 'devices', property: 'devices', visible: true, isModelProperty: true},
    {name: 'rating', property: 'rating', visible: true, isModelProperty: true},
    {name: 'status', property: 'status', visible: true, isModelProperty: true},
    {name: 'region', property: 'region', visible: true, isModelProperty: true},
    {name: 'country', property: 'country', visible: true, isModelProperty: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private pushNotificationsService: PushNotificationsService,
    private dialog: MatDialog
  ) {
    dialog.afterAllClosed.subscribe(() => {
      this.ngOnInit();
    });
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {

    this.subject$ = new ReplaySubject<PushNotification[]>(1);
    this.data$ = this.subject$.asObservable();
    this.pushNotifications = [];

    this.dataSource = null;

    this.pushNotificationsService.getData().subscribe((page: any) => {
      this.subject$.next(page.docs.map(data => new PushNotification(data)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((data) => {
        this.pushNotifications = data;
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

  openDialog() {
    this.dialog.open(PushNotificationAddDialogComponent, {
      disableClose: false,
      width: '640px'
    });
  }
}

@Component({
  selector: 'fury-push-notification-add-dialog-component',
  templateUrl: './push-notification-add-dialog.component.html',
})
export class PushNotificationAddDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;

  constructor(
    private dialogRef: MatDialogRef<PushNotificationAddDialogComponent>,
    private formBuilder: FormBuilder,
    private pushNotificationsService: PushNotificationsService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'theme': this.formBuilder.group({
        'ru': ['', Validators.required],
        'en': ['', Validators.required]
      }),
      'body': this.formBuilder.group({
        'ru': ['', Validators.required],
        'en': ['', Validators.required]
      }),
      'devices': ['', Validators.required]
    });
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    this.pushNotificationsService.postData(formData).subscribe((response: any) => {
      this.registerSuccess = true;
    }, (response: any) => {
      Object.keys(response.error).forEach(prop => {
        this.serverErrors[prop] = response.error[prop][0];
      });
    });

    this.form.reset();
    this.dialogRef.close();
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

}
