import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListColumn} from '../../@fury/shared/list/list-column.model';
import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {GamingCurrencyRate} from './gaming-currency-rate.model';
import {GamingCurrencyRateService} from './gaming-currency-rate.service';

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
    {name: 'Gold', property: 'gold', visible: true, isModelProperty: true},
  ] as ListColumn[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 10;

  constructor(
    private dialog: MatDialog,
    private gamingCurrencyRateService: GamingCurrencyRateService
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.subject$ = new ReplaySubject<GamingCurrencyRate[]>(1);
    this.data$ = this.subject$.asObservable();
    this.gamingCurrencyRates = [];
    this.dataSource = null;

    this.gamingCurrencyRateService.getData().subscribe((page: any) => {
      this.subject$.next(page.docs.map(data => new GamingCurrencyRate(data)));
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(
        filter(Boolean)
      ).subscribe((data) => {
        this.gamingCurrencyRates = data;
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
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
