import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {ThemesService} from './themes.service';
import {Theme} from './theme.model';

@Component({
  selector: 'fury-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

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

    this.subject$ = new ReplaySubject<Theme[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];

    this.dataSource = null;

    this.themesService.getData().subscribe((page: any) => {
      this.subject$.next(page.map(data => new Theme(data)));
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

  deleteData(id) {
    this.themesService.deleteData(id).subscribe((response: any) => {
      this.getData();
    }, (response: any) => {
      console.log(response);
    });
  }

  openDialog(data = null) {
    this.dialog.open(ThemeDialogComponent, {
      disableClose: false,
      width: '450px',
      data: data
    });
  }

}

@Component({
  selector: 'fury-theme-dialog-component',
  templateUrl: './theme-dialog.component.html',
})
export class ThemeDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;
  image: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ThemeDialogComponent>,
    private themesService: ThemesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      }),
      'price': [this.data ? this.data.price : ''],
      'is_buy': [this.data ? this.data.is_buy : ''],
      'image': [this.data ? this.data.image : '']
    });
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    if (this.data) {
      this.themesService.editData(this.data._id, formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.image) {
          this.themesService.postImg(response._id, this.image).subscribe(res => {
          });
        }
      }, (response: any) => {
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    } else {
      this.themesService.postData(formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.image) {
          this.themesService.postImg(response._id, this.image).subscribe(res => {
          });
        }
      }, (response: any) => {
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    }

    this.form.reset();
    this.dialogRef.close();
  }
}
