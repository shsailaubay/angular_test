import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {GamersLevelsService} from './gamers-levels.service';
import {GamersLevel} from './gamers-level.model';

@Component({
  selector: 'fury-gamers-levels',
  templateUrl: './gamers-levels.component.html',
  styleUrls: ['./gamers-levels.component.scss']
})
export class GamersLevelsComponent implements OnInit {

  subject$: ReplaySubject<GamersLevel[]> = new ReplaySubject<GamersLevel[]>(1);
  data$: Observable<GamersLevel[]> = this.subject$.asObservable();
  data: GamersLevel[];

  dataSource: MatTableDataSource<GamersLevel> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'Min', property: 'min', visible: true, isModelProperty: true},
    {name: 'Max', property: 'max', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private gamersLevelsService: GamersLevelsService,
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

    this.subject$ = new ReplaySubject<GamersLevel[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];

    this.dataSource = null;

    this.gamersLevelsService.getData().subscribe((page: any) => {
      this.subject$.next(page.map(data => new GamersLevel(data)));
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

  openDialog(data = null) {
    this.dialog.open(GamersLevelDialogComponent, {
      disableClose: false,
      width: '450px',
      data: data
    });
  }

  deleteData(id) {
    this.gamersLevelsService.deleteData(id).subscribe((response: any) => {
      this.getData();
    }, (response: any) => {
      console.log(response);
    });
  }
}

@Component({
  selector: 'fury-gamers-level-dialog-component',
  templateUrl: './gamers-level-dialog.component.html',
})
export class GamersLevelDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;

  constructor(
    private dialogRef: MatDialogRef<GamersLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gamersLevelsService: GamersLevelsService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      }),
      'min': [this.data ? this.data.min : ''],
      'max': [this.data ? this.data.max : '']
    });
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    if (this.data) {
      this.gamersLevelsService.editData(this.data._id, formData).subscribe((response: any) => {
        this.registerSuccess = true;
      }, (response: any) => {
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    } else {
      this.gamersLevelsService.postData(formData).subscribe((response: any) => {
        this.registerSuccess = true;
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
