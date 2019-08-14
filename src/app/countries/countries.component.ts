import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';

import {Observable, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {CountriesService} from './countries.service';
import {Country} from './country.model';

@Component({
  selector: 'fury-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  subject$: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1);
  data$: Observable<Country[]> = this.subject$.asObservable();
  countries: Country[];

  dataSource: MatTableDataSource<Country> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'id', property: '_id', visible: false, isModelProperty: true},
    {name: 'flag', property: 'flag', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'code', property: 'code', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private countriesService: CountriesService,
    private dialog: MatDialog
  ) {
    dialog.afterAllClosed.subscribe(() => {
      this.getData();
    });
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {

    this.subject$ = new ReplaySubject<Country[]>(1);
    this.data$ = this.subject$.asObservable();
    this.countries = [];

    this.dataSource = null;

    this.countriesService.getCountries().subscribe((page: any) => {
      this.subject$.next(page.map(countries => new Country(countries)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((countries) => {
        this.countries = countries;
        this.dataSource.data = countries;
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

  openDialog() {
    this.dialog.open(CountryDialogComponent, {
      disableClose: false,
      width: '450px'
    });
  }

  deleteCountry(id) {
    this.countriesService.deleteCountry(id).subscribe((response: any) => {
      this.getData();
    }, (response: any) => {
      console.log(response);
    });
  }
}

@Component({
  selector: 'fury-country-dialog-component',
  templateUrl: './country-dialog.component.html',
})
export class CountryDialogComponent implements OnInit {
  form: FormGroup;
  serverErrors = {};
  registerSuccess = false;

  constructor(
    private dialogRef: MatDialogRef<CountryDialogComponent>,
    private countriesService: CountriesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': this.formBuilder.group({
        'ru': ['', Validators.required],
        'en': ['', Validators.required]
      }),
      'flag': [''],
      'code': ['']
    });
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

  submit() {
    this.serverErrors = {};
    const formData = JSON.parse(JSON.stringify(this.form.value));

    this.countriesService.postCountry(formData).subscribe((response: any) => {
      this.registerSuccess = true;
    }, (response: any) => {
      Object.keys(response.error).forEach(prop => {
        this.serverErrors[prop] = response.error[prop][0];
      });
    });

    this.form.reset();
    this.dialogRef.close();
  }
}
