import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {Action} from './action.model';
import {ActionsService} from './actions.service';

@Component({
  selector: 'fury-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

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
    private router: Router,
    private actionsService: ActionsService
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.actionsService.getActions().subscribe((page: any) => {
      this.subject$.next(page.docs.map(actions => new Action(actions)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((actions) => {
        this.actions = actions;
        this.dataSource.data = actions;
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

  addAction() {
    this.router.navigate(['actions/add']);
  }

}
