import { BookingService } from './../booking.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {BookingData} from './booking.model';
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'app-choosegame',
  templateUrl: './choosegame.component.html',
  styleUrls: ['./choosegame.component.css']
})
export class ChoosegameComponent implements OnInit {

  bookingData = new BookingData(null, null, null, null, null, null);
  checkingData: BookingData;
  today = new Date();
  myDate: string;
  bookingForm: FormGroup;
  sessionVal: string;
  name: string;
  submitted = false;
  isDisabled1 = false;
  isDisabled2 = false;
  isDisabled3 = false;
  count: number;
  checkGame: boolean;
  checkData: boolean;
  checkEmpty: boolean;
  status: string;
  availableTimes = ['3pm-4pm', '4pm-5pm', '5pm-6pm', '6pm-7pm', '7pm-8pm', '8pm-9pm', '9pm-10pm', '10pm-11pm', '11pm-12am',
              '12am-1am', '1am-2am', '2am-3am', '3am-4am', '4am-5am', '5am-6am'];
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private datePipe: DatePipe, private formBuilder: FormBuilder, private serviceObject: BookingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('uname');
    // console.log(this.route.snapshot.params);
    // this.cypherText = this.route.snapshot.params.uname;
    // this.name = CryptoJs.AES.decrypt(this.cypherText.trim(), this.decPassword.trim()).toString(CryptoJs.enc.Utf8);
    // console.log(this.name);
    this.name = this.route.snapshot.params.name;
    // alert(this.name);
    if (this.sessionVal !== '') {
        if (this.sessionVal === this.name) {
          this.router.navigate(['chooseGame']);
        } else {
          this.router.navigate(['']);
        }
      } else {
        this.router.navigate(['']);
      }

    this.bookingForm = this.formBuilder.group({
        date: ['', Validators.required],
        teamSize: ['', Validators.required],
        time: ['', Validators.required],
        ground1: [''],
        ground2: [''],
        ground3: ['']
      });

  }

  get f() { return this.bookingForm.controls; }

  changeGroup(no) {
    if (no === 1) {
      this.isDisabled1 = true;
    } else if (no === 2) {
      this.isDisabled2 = true;
    } else {
      this.isDisabled3 = true;
    }
  }

  checkMyGame() {
    // console.log(this.bookingForm);
    this.submitted = true;
    this.checkGame = true;
    this.checkData = false;
    if (this.bookingForm.invalid === true) {
      return;
    }
    this.myDate = this.bookingForm.get('date').value;
    this.bookingData.date = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
    this.bookingData.teamSize = this.bookingForm.get('teamSize').value;
    this.bookingData.time = this.bookingForm.get('time').value;
    this.bookingData.ground1 = this.bookingForm.get('ground1').value;
    this.bookingData.ground2 = this.bookingForm.get('ground2').value;
    this.bookingData.ground3 = this.bookingForm.get('ground3').value;

    this.serviceObject.checkAvailable(this.bookingData)
      .subscribe((data) => {
        // console.log(data);
        this.status = JSON.parse(JSON.stringify(data)).Status;
        if (this.status === 'Available') {
          if (this.bookingData.teamSize === '7s' && this.checkData === false) {
            // All three available and 7s is chosen
            alert('The Ground is Available for 7s!');
            this.bookingForm = this.formBuilder.group({
              date: [this.myDate, Validators.required],
              teamSize: [this.bookingData.teamSize, Validators.required],
              time: [this.bookingData.time, Validators.required],
              ground1: [{value: true, disabled: true}],
              ground2: [{value: true, disabled: true}],
              ground3: [{value: true, disabled: true}]
            });
            this.bookingData.ground1 = this.bookingForm.get('ground1').value;
            this.bookingData.ground2 = this.bookingForm.get('ground2').value;
            this.bookingData.ground3 = this.bookingForm.get('ground3').value;
            this.checkData = true;
            this.checkEmpty = true;
          } else if (this.bookingData.teamSize === '5s' && this.checkData === false) {
            // All three available and 5s is chosen
              alert('The Ground G1 is available for 5s!');
              this.bookingForm = this.formBuilder.group({
                date: [this.myDate, Validators.required],
                teamSize: [this.bookingData.teamSize, Validators.required],
                time: [this.bookingData.time, Validators.required],
                ground1: [{value: true, disabled: true}],
                ground2: [{value: false, disabled: true}],
                ground3: [{value: false, disabled: true}]
              });
              this.bookingData.ground1 = this.bookingForm.get('ground1').value;
              this.bookingData.ground2 = this.bookingForm.get('ground2').value;
              this.bookingData.ground3 = this.bookingForm.get('ground3').value;
              this.checkData = true;
              this.checkEmpty = true;
          }
        } else {
          // Some bookings are already there. So not available for 7s

          this.checkEmpty = false;
          this.checkingData = JSON.parse(JSON.stringify(data));
          console.log(this.checkingData);
          if (this.bookingData.teamSize === '7s' && this.checkData === false) {
            alert('The Ground is not available for 7s. Please choose another time!');
            this.checkData = true;
          } else if (this.bookingData.teamSize === '5s' && this.checkData === false) {
              if (this.checkData === false && this.checkingData.ground1 === true && this.checkingData.ground2 === false) {
                alert('The Ground G1 has already been booked. G2 is available for 5s!');
                this.checkData = true;
                this.bookingForm = this.formBuilder.group({
                  date: [this.myDate, Validators.required],
                  teamSize: [this.bookingData.teamSize, Validators.required],
                  time: [this.bookingData.time, Validators.required],
                  ground1: [{value: true, disabled: true}],
                  ground2: [{value: true, disabled: true}],
                  ground3: [{value: false, disabled: true}]
                });
                this.bookingData.ground1 = this.bookingForm.get('ground1').value;
                this.bookingData.ground2 = this.bookingForm.get('ground2').value;
                this.bookingData.ground3 = this.bookingForm.get('ground3').value;
              } else if (this.checkData === false && this.checkingData.ground2 === true && this.checkingData.ground3 === false) {
                alert('The Grounds G1 and G2 has already been booked. G3 is available for 5s!');
                this.bookingForm = this.formBuilder.group({
                  date: [this.myDate, Validators.required],
                  teamSize: [this.bookingData.teamSize, Validators.required],
                  time: [this.bookingData.time, Validators.required],
                  ground1: [{value: true, disabled: true}],
                  ground2: [{value: true, disabled: true}],
                  ground3: [{value: true, disabled: true}]
                });
                this.bookingData.ground1 = this.bookingForm.get('ground1').value;
                this.bookingData.ground2 = this.bookingForm.get('ground2').value;
                this.bookingData.ground3 = this.bookingForm.get('ground3').value;
                this.checkData = true;
              } else {
                alert('The Grounds are not available at this time. Please pick another time!');
                this.checkData = true;
              }
          }
        }
      });
  }

  checkStatus() {
    this.checkGame = false;
  }

  bookMyGame() {
    if (this.checkGame === true && this.checkEmpty === true) {
      // console.log(this.bookingData);
      this.serviceObject.saveMyGame(this.bookingData)
        .subscribe((data) => {
          this.status = JSON.parse(JSON.stringify(data)).Status;
          alert(this.status);
          this.router.navigate(['player', {uname: this.name}]);
        });
    } else if (this.checkGame === true && this.checkEmpty === false) {
      this.checkData = true;
      this.serviceObject.updateMyGame(this.bookingData)
        .subscribe((data) => {
          this.status = JSON.parse(JSON.stringify(data)).Status;
          alert(this.status);
          this.router.navigate(['player', {uname: this.name}]);
        });
    } else {
      alert('Please Check The Availability of Grounds');
    }
  }

  logout(): void {
    this.storage.remove('uname');
    this.router.navigate(['']);
  }

}
