import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';
import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Country} from './country.model';
import {COUNTRIES_DEMO_DATA} from './countries.demo';

@Component({
  selector: 'fury-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, AfterViewInit {

  subject$: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1);
  data$: Observable<Country[]> = this.subject$.asObservable();
  countries: Country[];

  dataSource: MatTableDataSource<Country> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private dialog: MatDialog
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(COUNTRIES_DEMO_DATA.map(c => new Country(c)));
  }

  ngOnInit() {

    this.getData().subscribe(c => {
      this.subject$.next(c);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((c) => {
      this.countries = c;
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

  openDialog() {
    this.dialog.open(CountryDialogComponent, {
      disableClose: false,
      width: '450px'
    });
  }
}

@Component({
  selector: 'fury-country-dialog-component',
  templateUrl: './country-dialog.component.html',
})
export class CountryDialogComponent {
  constructor(private dialogRef: MatDialogRef<CountryDialogComponent>) {
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
