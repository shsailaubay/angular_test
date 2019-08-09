import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';
import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {GamingCurrencyRate} from '../../shared/models/gaming-currency-rate.model';
import {GAMING_CURRENCY_RATES_DEMO_DATA} from '../../../assets/gaming-currency-rates.demo';

@Component({
  selector: 'fury-gaming-currency-rates',
  templateUrl: './gaming-currency-rates.component.html',
  styleUrls: ['./gaming-currency-rates.component.scss']
})
export class GamingCurrencyRatesComponent implements OnInit, AfterViewInit {

  subject$: ReplaySubject<GamingCurrencyRate[]> = new ReplaySubject<GamingCurrencyRate[]>(1);
  data$: Observable<GamingCurrencyRate[]> = this.subject$.asObservable();
  gamingCurrencyRates: GamingCurrencyRate[];

  dataSource: MatTableDataSource<GamingCurrencyRate> | null;

  @Input()
  columns: ListColumn[] = [
    {name: 'Date', property: 'date', visible: true, isModelProperty: true},
    {name: 'Time', property: 'time', visible: true, isModelProperty: true},
    {name: 'Rate', property: 'rate', visible: true, isModelProperty: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private dialog: MatDialog
  ) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(GAMING_CURRENCY_RATES_DEMO_DATA.map(gcr => new GamingCurrencyRate(gcr)));
  }

  ngOnInit() {
    this.getData().subscribe(gcr => {
      this.subject$.next(gcr);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((gcr) => {
      this.gamingCurrencyRates = gcr;
      this.dataSource.data = gcr;
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
    this.dialog.open(GamingCurrencyRateDialogComponent, {
      disableClose: false,
      width: '450px'
    });
  }
}

@Component({
  selector: 'fury-gaming-currency-rate-dialog-component',
  templateUrl: './gaming-currency-rate-dialog.component.html',
})
export class GamingCurrencyRateDialogComponent {
  constructor(private dialogRef: MatDialogRef<GamingCurrencyRateDialogComponent>) {
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
