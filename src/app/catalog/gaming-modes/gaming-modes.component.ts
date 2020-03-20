import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {GamingModesService} from './gaming-modes.service';
import {GamingMode} from './gaming-mode.model';

@Component({
  selector: 'fury-gaming-modes',
  templateUrl: './gaming-modes.component.html',
  styleUrls: ['./gaming-modes.component.scss']
})
export class GamingModesComponent implements OnInit {

  subject$: ReplaySubject<GamingMode[]> = new ReplaySubject<GamingMode[]>(1);
  data$: Observable<GamingMode[]> = this.subject$.asObservable();
  data: GamingMode[];
  isWasOpened = false;

  dataSource: MatTableDataSource<GamingMode> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'description', property: 'description_ru', visible: true, isModelProperty: true},
    {name: 'description', property: 'description_en', visible: true, isModelProperty: true},
    {name: 'tag', property: 'slug', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private gamingModesService: GamingModesService,
    private dialog: MatDialog
  ) {
    dialog.afterAllClosed.subscribe(() => {
      if (this.isWasOpened) {
        this.ngOnInit();
        this.isWasOpened = false;
      }
    });
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {

    this.subject$ = new ReplaySubject<GamingMode[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];

    this.dataSource = null;

    this.gamingModesService.getData().subscribe((page: any) => {
      this.subject$.next(page.map(data => new GamingMode(data)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((data) => {
        this.data = data;
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
  //   this.dialog.open(GamingModeDialogComponent, {
  //     disableClose: false,
  //     width: '450px',
  //     data: data
  //   });
  //   this.isWasOpened = true;
  // }

  deleteData(id) {
    this.gamingModesService.deleteData(id).subscribe((response: any) => {
      this.getData();
    }, (response: any) => {
      console.log(response);
    });
  }
}
