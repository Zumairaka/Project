import { BookingService } from './../booking.service';
import { UserData } from './../signup/signup.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ValidatePassword } from './../must-match/validate-password';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  sessionVal: string;
  userData: UserData;
  name: string;
  status: string;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private formBuilder: FormBuilder, private serviceObject: BookingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('uname');
    // console.log(this.route.snapshot.params);
    // this.cypherText = this.route.snapshot.params.uname;
    // this.name = CryptoJs.AES.decrypt(this.cypherText.trim(), this.decPassword.trim()).toString(CryptoJs.enc.Utf8);
    // console.log(this.name);
    this.name = this.route.snapshot.params.uname;
    if (this.sessionVal !== '') {
        if (this.sessionVal === this.name) {
            this.serviceObject.getUserData(this.name).subscribe((data) => {
              this.status = JSON.parse(JSON.stringify(data)).Status;
              if (this.status === 'Error') {
                alert(this.status);
              } else {
                this.userData = JSON.parse(JSON.stringify(data));
                this.signupForm = this.formBuilder.group({
                  fname: [this.userData.fname, Validators.required],
                  lname: [this.userData.lname, Validators.required],
                  password: [this.userData.password, [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
                  confirmPassword: [this.userData.confirmPassword, Validators.required],
                  email: [this.userData.email, [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
                  phone: [this.userData.phone, [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}$/)]],
                  phoneAlt: [this.userData.phoneAlt, [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}$/)]],
                  age: [this.userData.age, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
                  cname: [this.userData.cname, [Validators.required, Validators.minLength(3)]],
                  locality: [this.userData.locality, [Validators.required, Validators.minLength(3)]],
                  address: [this.userData.address, Validators.required] }, {
                      validator: ValidatePassword.MatchPassword
                  });
              }
            });
        } else {
          this.router.navigate(['']);
        }
      } else {
        this.router.navigate(['']);
      }
  }

  get f() { return this.signupForm.controls; }

  editAccountDetails() {
    this.submitted = true;
    if (this.signupForm.invalid === true) {
      return;
    } else {
      this.userData.fname = this.signupForm.get('fname').value;
      this.userData.lname = this.signupForm.get('lname').value;
      this.userData.uname = this.name;
      this.userData.password = this.signupForm.get('password').value;
      this.userData.confirmPassword = this.signupForm.get('confirmPassword').value;
      this.userData.email = this.signupForm.get('email').value;
      this.userData.phone = this.signupForm.get('phone').value;
      this.userData.phoneAlt = this.signupForm.get('phoneAlt').value;
      this.userData.age = this.signupForm.get('age').value;
      this.userData.cname = this.signupForm.get('cname').value;
      this.userData.locality = this.signupForm.get('locality').value;
      this.userData.address = this.signupForm.get('address').value;
    }

    this.serviceObject.editAccountData(this.userData).subscribe((data) => {
      this.status = JSON.parse(JSON.stringify(data)).Status;
      if (this.status === 'Error') {
        alert(this.status);
      } else {
        alert(this.status);
        this.router.navigate(['player', {uname: this.name}]);
      }
    });
  }

  cancel() {
    this.router.navigate(['player', {uname: this.name}]);
  }

  reset() {
    this.submitted = false;
  }

}
