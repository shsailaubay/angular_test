import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {fadeInUpAnimation} from '../../../@fury/animations/fade-in-up.animation';
import {LoginService} from './login.service';
import {Login} from './login.model';
import {SessionService} from '../../session.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  subscription: Subscription;

  adminUser;
  loginError = false;

  inputType = 'password';
  visible = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private loginService: LoginService,
    private sessionService: SessionService
  ) {
  }

  ngOnInit() {
    if (this.sessionService.getItem('x-api-token')) {
      this.router.navigate(['/']);
    }
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  send() {
    this.form.disable();
    this.loginError = false;
    this.subscription = this.loginService.postLogin(this.form.value).subscribe(response => {
      this.adminUser = new Login(response);
      this.sessionService.setItem('x-api-token', this.adminUser._token);
      this.sessionService.setItem('_id', this.adminUser._id);
      this.sessionService.setItem('userName', this.adminUser.name);
      this.sessionService.setItem('userEmail', this.adminUser.email);
      this.router.navigate(['/']);
    }, error => {
      this.loginError = error;
      this.form.enable();
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
