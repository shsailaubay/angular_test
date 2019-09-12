import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {BoostersService} from './boosters.service';
import {Booster} from './booster.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GamesService} from '../games/games.service';
import {Game} from '../games/game.model';

@Component({
  selector: 'fury-boosters',
  templateUrl: './boosters.component.html',
  styleUrls: ['./boosters.component.scss']
})
export class BoostersComponent implements OnInit {

  subject$: ReplaySubject<Booster[]> = new ReplaySubject<Booster[]>(1);
  data$: Observable<Booster[]> = this.subject$.asObservable();
  data: Booster[];

  dataSource: MatTableDataSource<Booster> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'image', property: 'image', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'Game', property: 'game_name_ru', visible: true, isModelProperty: true},
    {name: 'Game', property: 'game_name_en', visible: true, isModelProperty: true},
    {name: 'silver', property: 'silver', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private boostersService: BoostersService,
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
    this.subject$ = new ReplaySubject<Booster[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];
    this.dataSource = null;

    this.boostersService.getData().subscribe((page: any) => {
      this.subject$.next(page.map(data => new Booster(data)));
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
    this.boostersService.deleteData(id).subscribe((response: any) => {
      this.getData();
    }, (response: any) => {
      console.log(response);
    });
  }

  openDialog(data = null) {
    this.dialog.open(BoosterDialogComponent, {
      disableClose: false,
      width: '450px',
      data: data
    });
  }
}

@Component({
  selector: 'fury-booster-dialog-component',
  templateUrl: './booster-dialog.component.html',
})
export class BoosterDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;
  image: File;

  subject$: ReplaySubject<Game[]> = new ReplaySubject<Game[]>(1);
  data$: Observable<Game[]> = this.subject$.asObservable();
  gamesList: Game[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BoosterDialogComponent>,
    private formBuilder: FormBuilder,
    private boostersService: BoostersService,
    private gamesService: GamesService
  ) {
  }

  ngOnInit() {

    this.gamesService.getData().subscribe((page: any) => {
      this.subject$.next(page.map(data => new Game(data)));
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((data) => {
        this.gamesList = data;
      });
    });

    console.log(this.data);

    this.form = this.formBuilder.group({
      'name': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      }),
      'game': [this.data ? this.data.game_id : ''],
      'silver': [this.data ? this.data.silver : ''],
      'image': [this.data ? this.data.image : '']
    });
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    if (this.data) {
      this.boostersService.editData(this.data._id, formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.image) {
          this.boostersService.postImg(response._id, this.image).subscribe(res => {
            console.log(res);
          });
        }
      }, (response: any) => {
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    } else {
      this.boostersService.postData(formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.image) {
          this.boostersService.postImg(response._id, this.image).subscribe(res => {
            console.log(res);
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

  close() {
    this.form.reset();
    this.dialogRef.close();
  }
}
