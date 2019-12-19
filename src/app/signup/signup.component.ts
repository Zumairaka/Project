import { ValidatePassword } from './../must-match/validate-password';
import { BookingService } from './../booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from './signup.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  status: string;
  userData = new UserData(null, null, null, null, null, null, null, null, null, null, null, null);
  constructor(private router: Router, private serviceObject: BookingService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      uname: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}$/)]],
      phoneAlt: ['', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}$/)]],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      cname: ['', [Validators.required, Validators.minLength(3)]],
      locality: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required] }, {
          validator: ValidatePassword.MatchPassword
      });
  }

  get f() { return this.signupForm.controls; }

  signUp() {
    this.submitted = true;
    if (this.signupForm.invalid === true) {
      return;
    } else {
      this.userData.fname = this.signupForm.get('fname').value;
      this.userData.lname = this.signupForm.get('lname').value;
      this.userData.uname = this.signupForm.get('uname').value;
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

    this.serviceObject.signUpData(this.userData)
      .subscribe((data) => {
        console.log(JSON.parse(JSON.stringify(data)).Status);
        this.status = JSON.parse(JSON.stringify(data)).Status;
        if (this.status === 'Success') {
          this.router.navigateByUrl('', { skipLocationChange : true })
            .then(() => {
              alert('Successfully Signed Up !');
              this.router.navigate(['login']);
            });
        } else {
          alert(this.status);
        }
      });
  }

  cancel() {
    this.router.navigate(['login']);
  }

  reset() {
    this.submitted = false;
  }

}
