import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {GamesService} from './games.service';
import {Game} from './game.model';
import {GamingModesService} from '../gaming-modes/gaming-modes.service';
import {GamingMode} from '../gaming-modes/gaming-mode.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'fury-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  baseUrl = environment.backend;

  subject$: ReplaySubject<Game[]> = new ReplaySubject<Game[]>(1);
  data$: Observable<Game[]> = this.subject$.asObservable();
  data: Game[];
  isWasOpened = false;

  dataSource: MatTableDataSource<Game> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'icon', property: 'icon', visible: true, isModelProperty: true},
    {name: 'image', property: 'image', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_ru', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name_en', visible: true, isModelProperty: true},
    {name: 'link', property: 'link', visible: true, isModelProperty: true},
    {name: 'gaming_modes', property: 'allowedOptions', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private gamesService: GamesService,
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

    this.subject$ = new ReplaySubject<Game[]>(1);
    this.data$ = this.subject$.asObservable();
    this.data = [];

    this.dataSource = null;

    this.gamesService.getData().subscribe((page: any) => {
      this.subject$.next(page.map(data => new Game(data)));
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
    this.dialog.open(GameDialogComponent, {
      disableClose: false,
      width: '465px',
      data: data
    });
    this.isWasOpened = true;
  }

  deleteData(id) {
    this.gamesService.deleteData(id).subscribe((response: any) => {
      this.getData();
    }, (response: any) => {
      console.log(response);
    });
  }
}

@Component({
  selector: 'fury-game-dialog-component',
  templateUrl: './game-dialog.component.html',
})
export class GameDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;
  image: File;
  icon: File;
  selectedOptions = [];

  subject$: ReplaySubject<GamingMode[]> = new ReplaySubject<GamingMode[]>(1);
  data$: Observable<GamingMode[]> = this.subject$.asObservable();
  gamingModes: GamingMode[];

  constructor(
    private dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gamesService: GamesService,
    private gamingModesService: GamingModesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {

    this.gamingModesService.getData().subscribe((page: any) => {
      this.subject$.next(page.map(data => new GamingMode(data)));
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((data) => {
        this.gamingModes = data;
      });
    });

    if (this.data) {
      for (let i = 0; i < this.data.allowedOptions.length; i++) {
        this.selectedOptions.push(this.data.allowedOptions[i]._id);
      }
    }

    this.form = this.formBuilder.group({
      'name': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      }),
      'link': [this.data ? this.data['link'] : ''],
      'icon': [this.data ? this.data.icon : ''],
      'image': [this.data ? this.data.image : ''],
      'allowedOptions': [this.data ? this.selectedOptions : '']
    });
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
  }

  onFileChanged2(event) {
    this.icon = event.target.files[0];
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    if (this.data) {
      this.gamesService.editData(this.data._id, formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.image) {
          this.gamesService.postImg(response._id, this.image).subscribe(res => {
          });
        }
        if (this.icon) {
          this.gamesService.postIcon(response._id, this.icon).subscribe(res => {
          });
        }
      }, (response: any) => {
        Object.keys(response.error).forEach(prop => {
          this.serverErrors[prop] = response.error[prop][0];
        });
      });
    } else {
      this.gamesService.postData(formData).subscribe((response: any) => {
        this.registerSuccess = true;
        if (this.image) {
          this.gamesService.postImg(response._id, this.image).subscribe(res => {
          });
        }
        if (this.icon) {
          this.gamesService.postIcon(response._id, this.icon).subscribe(res => {
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
