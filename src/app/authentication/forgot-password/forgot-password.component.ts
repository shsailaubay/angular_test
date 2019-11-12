import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
import {LoginService} from '../login/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'fury-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  subscription: Subscription;
  loginError = false;
  resetSuccess = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  send() {
    this.form.disable();
    this.loginError = false;
    this.subscription = this.loginService.resetPassword(this.form.value).subscribe(response => {
    }, error => {
      console.log(error);
      if (error.status === 201) {
        this.resetSuccess = error;
      } else if (error.status === 400) {
        console.log(error);
        this.loginError = error;
        this.form.enable();
      }
    });
  }
}
