import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {Action} from './action.model';
import {ActionsService} from './actions.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountriesService} from '../countries/countries.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'fury-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  baseUrl = environment.backend;

  subject$: ReplaySubject<Action[]> = new ReplaySubject<Action[]>(1);
  data$: Observable<Action[]> = this.subject$.asObservable();
  actions: Action[];

  dataSource: MatTableDataSource<Action> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'country', property: 'country', visible: true, isModelProperty: true},
    {name: 'image', property: 'image', visible: true, isModelProperty: true},
    // {name: 'Region', property: 'region', visible: true, isModelProperty: true},
    // {name: 'game', property: 'game', visible: true, isModelProperty: true},
    {name: 'name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'message', property: 'message_ru', visible: false, isModelProperty: true},
    {name: 'message', property: 'message_en', visible: false, isModelProperty: true},
    // {name: 'type', property: 'type', visible: true, isModelProperty: true},
    // {name: 'conditions', property: 'conditions', visible: true, isModelProperty: true},
    {name: 'freeSilvers', property: 'freeSilvers', visible: true, isModelProperty: true},
    {name: 'freeGold', property: 'freeGold', visible: true, isModelProperty: true},
    {name: 'actionPrice', property: 'actionPrice', visible: true, isModelProperty: true},
    {name: 'active', property: 'active', visible: true, isModelProperty: true},
    {name: 'startDate', property: 'startDate', visible: true, isModelProperty: true},
    {name: 'endDate', property: 'endDate', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private actionsService: ActionsService,
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
    this.subject$ = new ReplaySubject<Action[]>(1);
    this.data$ = this.subject$.asObservable();
    this.actions = [];

    this.dataSource = null;

    this.actionsService.getActions().subscribe((page: any) => {
      this.subject$.next(page.map(data => new Action(data)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((data) => {
        this.actions = data;
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

  // openDialog(data = null) {
  //   this.dialog.open(ActionDialogComponent, {
  //     disableClose: false,
  //     width: '640px',
  //     data: data
  //   });
  // }

  deleteAction(id) {
    this.actionsService.deleteAction(id).subscribe((response: any) => {
      this.getData();
    }, (response: any) => {
      console.log(response);
    });
  }
}
