import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';

import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {Action} from '../../shared/models/action.model';
import {ACTIONS_DEMO_DATA} from '../../../assets/actions.demo';

@Component({
  selector: 'fury-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, AfterViewInit {

  subject$: ReplaySubject<Action[]> = new ReplaySubject<Action[]>(1);
  data$: Observable<Action[]> = this.subject$.asObservable();
  actions: Action[];

  dataSource: MatTableDataSource<Action> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Region', property: 'region', visible: true, isModelProperty: true},
    {name: 'country', property: 'country', visible: true, isModelProperty: true},
    {name: 'game', property: 'game', visible: true, isModelProperty: true},
    {name: 'name', property: 'name', visible: true, isModelProperty: true},
    {name: 'dateTo', property: 'dateTo', visible: true, isModelProperty: true},
    {name: 'type', property: 'type', visible: true, isModelProperty: true},
    {name: 'conditions', property: 'conditions', visible: true, isModelProperty: true},
    {name: 'image', property: 'image', visible: true, isModelProperty: true},
    {name: 'reward', property: 'reward', visible: true, isModelProperty: true},
    {name: 'status', property: 'status', visible: true, isModelProperty: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private router: Router
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(ACTIONS_DEMO_DATA.map(c => new Action(c)));
  }

  ngOnInit() {

    this.getData().subscribe(c => {
      this.subject$.next(c);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((c) => {
      this.actions = c;
      this.dataSource.data = c;
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

  addAction() {
    this.router.navigate(['actions/add']);
  }

}
