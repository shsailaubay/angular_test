import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ListColumn } from '../../../@fury/shared/list/list-column.model';

import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ThemesService } from './themes.service';
import { Theme } from './theme.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fury-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
})
export class ThemesComponent implements OnInit {

  baseUrl = environment.backend;

  subject$: ReplaySubject<Theme[]> = new ReplaySubject<Theme[]>(1);
  data$: Observable<Theme[]> = this.subject$.asObservable();
  data: Theme[];

  dataSource: MatTableDataSource<Theme> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'image', property: 'image', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'Price', property: 'price', visible: true, isModelProperty: true},
    {name: 'Is buy', property: 'is_buy', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private themesService: ThemesService,
    private dialog: MatDialog,
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

    this.subject$ = new ReplaySubject<Theme[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];

    this.dataSource = null;

    this.themesService.getData().subscribe((page: any) => {
      this.subject$.next(page.map(data => new Theme(data)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean),
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

  deleteData(id) {
    this.themesService.deleteData(id).subscribe((response: any) => {
      this.getData();
    }, (response: any) => {
      console.log(response);
    });
  }

  // openDialog(data = null) {
  //   this.dialog.open(ThemeDialogComponent, {
  //     disableClose: false,
  //     width: '450px',
  //     data: data,
  //   });
  // }

}
