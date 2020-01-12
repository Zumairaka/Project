import { LoginData } from './login.model';
import { BookingService } from './../booking.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'app-login',
  providers: [ BookingService ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginData = new LoginData(null, null);
  submitted = false;
  status: string;
  encPassword = 'kickoff098';
  cypherText: string;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private serviceObject: BookingService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      uname: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid === true) {
      return;
    }
    this.loginData.uname = this.loginForm.get('uname').value;
    this.loginData.password = this.loginForm.get('password').value;
    console.log(this.loginData);
    if ((this.loginData.uname === 'kickoff_admin') && (this.loginData.password === 'Kickoff@987')) {
      this.router.navigate(['showBookings']);
      this.storage.set('admin', this.loginData.uname);
    } else {
      this.serviceObject.loginVerify(this.loginData)
        .subscribe((data) => {
          this.status = JSON.parse(JSON.stringify(data)).Status;
          if (this.status === 'Success') {
            this.router.navigateByUrl('', { skipLocationChange: true })
              .then (() => {
                this.storage.set('uname', this.loginData.uname);
                this.cypherText = CryptoJs.AES.encrypt(this.loginData.uname.trim(), this.encPassword.trim()).toString();
                // console.log(this.cypherText);
                this.router.navigate(['player', {uname: this.loginData.uname}]);
              });
          } else {
              alert(this.status);
          }
        });
    }
  }

  register(): void {
    this.router.navigate(['signup']);
  }

  reset() {
    this.submitted = false;
  }
}
