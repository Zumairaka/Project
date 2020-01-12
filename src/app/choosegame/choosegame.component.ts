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

  bookingData = new BookingData(null,null, null, null, null, null, null);
  checkingData: BookingData[];
  today = new Date();
  myDate: string;
  bookingForm: FormGroup;
  sessionVal: string;
  name: string;
  ground1 = false;
  ground2 = false;
  ground3 = false;
  leng = 0;
  submitted = false;
  count: number;
  checkGame: boolean;
  checkData: boolean;
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
        uname: [this.name],
        date: ['', Validators.required],
        teamSize: ['', Validators.required],
        time: ['', Validators.required],
        ground1: [''],
        ground2: [''],
        ground3: ['']
      });

  }

  get f() { return this.bookingForm.controls; }

  checkMyGame() {
    // console.log(this.bookingForm);
    this.submitted = true;
    this.checkGame = true;
    this.checkData = true;
    if (this.bookingForm.invalid === true) {
      return;
    }
    this.myDate = this.bookingForm.get('date').value;
    this.bookingData.uname = this.name;
    this.bookingData.date = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
    this.bookingData.teamSize = this.bookingForm.get('teamSize').value;
    this.bookingData.time = this.bookingForm.get('time').value;
    this.bookingData.ground1 = this.bookingForm.get('ground1').value;
    this.bookingData.ground2 = this.bookingForm.get('ground2').value;
    this.bookingData.ground3 = this.bookingForm.get('ground3').value;

    // console.log(this.bookingData);
    this.serviceObject.checkAvailable(this.bookingData)
      .subscribe((data) => {
        // console.log(data);
        this.status = JSON.parse(JSON.stringify(data)).Status;
        /// console.log(this.status);
        if (this.status === 'Error') {
          alert(this.status);
        } else {
          // Some bookings May or Maynot be there.

          this.checkingData = JSON.parse(JSON.stringify(data));
          // console.log(this.checkingData);

          // mark the grounds which are booked.
          if (this.checkingData.length !== 0) {
            let i = 0;
            while (this.leng !== this.checkingData.length) {
              if (this.checkingData[i].ground1 === true) {
                this.ground1 = true;
              }
              if (this.checkingData[i].ground2 === true) {
                this.ground2 = true;
              }
              if (this.checkingData[i].ground3 === true) {
                this.ground3 = true;
              }
              i++; this.leng++;
            }
          }

          if ((this.bookingData.teamSize === '7s') && (this.checkData === true) && (this.checkingData.length !== 0)) {
            this.checkData = false;
            alert('The Ground is not available for 7s. Please choose another time!');

          } else if ((this.bookingData.teamSize === '7s') && (this.checkData === true) && (this.checkingData.length === 0)) {
            // All three available and 7s is chosen.
            this.checkData = false;
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

          } else if ((this.bookingData.teamSize === '5s') && (this.checkData === true) && (this.checkingData.length === 0)) {
            // All three available and 5s is chosen.

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
            this.checkData = false;

          // tslint:disable-next-line:max-line-length
          } else if ((this.bookingData.teamSize === '5s') && (this.checkData === true) && (this.checkingData.length !== 0) && (this.ground3 === false) && (this.ground1 === true) && (this.ground2 === false)) {
                // ground 1 booked, ground 2 available.

                alert('The Ground G1 has already been booked. G2 is available for 5s!');
                this.checkData = false;
                this.bookingForm = this.formBuilder.group({
                  date: [this.myDate, Validators.required],
                  teamSize: [this.bookingData.teamSize, Validators.required],
                  time: [this.bookingData.time, Validators.required],
                  ground1: [{value: false, disabled: true}],
                  ground2: [{value: true, disabled: true}],
                  ground3: [{value: false, disabled: true}]
                });
                this.bookingData.ground1 = this.bookingForm.get('ground1').value;
                this.bookingData.ground2 = this.bookingForm.get('ground2').value;
                this.bookingData.ground3 = this.bookingForm.get('ground3').value;

              // tslint:disable-next-line:max-line-length
              } else if ((this.bookingData.teamSize === '5s') && (this.checkData === true) && (this.checkingData.length !== 0) && (this.ground1 === true) && (this.ground2 === true) && (this.ground3 === false)) {

                // Ground 1 and 2 booked, 3 available.
                alert('The Grounds G1 and G2 has already been booked. G3 is available for 5s!');
                this.bookingForm = this.formBuilder.group({
                  date: [this.myDate, Validators.required],
                  teamSize: [this.bookingData.teamSize, Validators.required],
                  time: [this.bookingData.time, Validators.required],
                  ground1: [{value: false, disabled: true}],
                  ground2: [{value: false, disabled: true}],
                  ground3: [{value: true, disabled: true}]
                });
                this.bookingData.ground1 = this.bookingForm.get('ground1').value;
                this.bookingData.ground2 = this.bookingForm.get('ground2').value;
                this.bookingData.ground3 = this.bookingForm.get('ground3').value;
                this.checkData = false;

              // tslint:disable-next-line:max-line-length
              } else if ((this.checkData === true) && (this.ground3 === true) && (this.bookingData.teamSize === '5s') && (this.checkingData.length !== 0)) {
                this.checkData = false;
                alert('The Grounds are not available for the selected time. Please choose another time!');
              }
          }
      });
  }

  checkStatus() {
    this.checkGame = false;
  }

  bookMyGame(checkGame, bookingData) {
    // this.checkData = false;
    if (checkGame === true) {
      // console.log(this.bookingData);
      this.serviceObject.saveMyGame(bookingData)
        .subscribe((data) => {
          this.status = JSON.parse(JSON.stringify(data)).Status;
          alert(this.status);
          this.router.navigate(['player', {uname: this.name}]);
        });
    } else {
      alert('Please Check The Availability of Grounds');
    }
  }

  cancel() {
    this.router.navigate(['player', {uname: this.name}]);
  }

}
