import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';

import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {PushNotification} from '../../shared/models/push-notification.model';
import {PUSH_NOTIFICATIONS_DEMO_DATA} from '../../../assets/push-notifications.demo';

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
    {name: 'text', property: 'text', visible: true, isModelProperty: true},
    {name: 'type', property: 'type', visible: true, isModelProperty: true},
    {name: 'rating', property: 'rating', visible: true, isModelProperty: true},
    {name: 'status', property: 'status', visible: true, isModelProperty: true},
    {name: 'region', property: 'region', visible: true, isModelProperty: true},
    {name: 'country', property: 'country', visible: true, isModelProperty: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor() {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(PUSH_NOTIFICATIONS_DEMO_DATA.map(c => new PushNotification(c)));
  }

  ngOnInit() {

    this.getData().subscribe(c => {
      this.subject$.next(c);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((c) => {
      this.pushNotifications = c;
      this.dataSource.data = c;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
