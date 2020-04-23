import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { GamingMode } from '../gaming-modes/gaming-mode.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GamesService } from './games.service';
import { GamingModesService } from '../gaming-modes/gaming-modes.service';
import { filter } from 'rxjs/operators';

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
      'description': this.formBuilder.group({
        'ru': [this.data ? this.data.description_ru : '', Validators.required],
        'en': [this.data ? this.data.description_en : '', Validators.required]
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
