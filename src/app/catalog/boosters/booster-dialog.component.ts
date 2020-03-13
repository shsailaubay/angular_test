import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { Game } from '../games/game.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BoostersService } from './boosters.service';
import { GamesService } from '../games/games.service';
import { filter } from 'rxjs/operators';

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


    this.form = this.formBuilder.group({
      'name': this.formBuilder.group({
        'ru': [this.data ? this.data.name_ru : '', Validators.required],
        'en': [this.data ? this.data.name_en : '', Validators.required]
      }),
      'game': [this.data ? this.data.game_id : ''],
      'silver': [this.data ? this.data.silver : ''],
      'gold': [this.data ? this.data.gold : ''],
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
