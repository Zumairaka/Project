import { DatePipe } from '@angular/common';
import { BookingService } from './../booking.service';
import { BookingData } from './../choosegame/booking.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  sessionVal: string;
  day = new Date();
  today: string;
  bookingData: BookingData[];
  allotted: BookingData[];
  name: string;
  status: string;
  message;
  flag = false;
  decPassword = 'kickoff098';
  cypherText: string;
  available = ['3pm-4pm', '4pm-5pm', '5pm-6pm', '6pm-7pm', '7pm-8pm', '8pm-9pm', '9pm-10pm', '10pm-11pm', '11pm-12am',
              '12am-1am', '1am-2am', '2am-3am', '3am-4am', '4am-5am', '5am-6am'];
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private datePipe: DatePipe, private serviceObject: BookingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('uname');
    // console.log(this.route.snapshot.params);
    // this.cypherText = this.route.snapshot.params.uname;
    // this.name = CryptoJs.AES.decrypt(this.cypherText.trim(), this.decPassword.trim()).toString(CryptoJs.enc.Utf8);
    // console.log(this.name);
    this.name = this.route.snapshot.params.uname;
    if (this.sessionVal !== '') {
        if (this.sessionVal === this.name) {
          this.today = this.datePipe.transform(this.day, 'dd-MM-yyyy');
          this.serviceObject.getBookingDataToday(this.today).subscribe((data) => {
            this.status = JSON.parse(JSON.stringify(data)).Status;
            if (this.status === 'No_Data') {
              this.flag = true;
              this.message = 'No Bookings For Today';
              this.router.navigate(['player']);
            } else if (this.status === 'Error') {
              alert(this.status);
            } else {
              this.bookingData = JSON.parse(JSON.stringify(data));
              console.log(this.bookingData);
              this.router.navigate(['player']);
            }
          });
        } else {
          this.router.navigate(['']);
        }
      } else {
        this.router.navigate(['']);
      }

  }

  chooseMyGame(): void {
    this.router.navigate(['chooseGame', {name: this.name}]);
  }

  editAccount(name) {
    this.router.navigate(['edit', {uname: name}]);
  }

  showMyBookings(name) {
    this.router.navigate(['showMyBookings', {uname: name}]);
  }

  logout(): void {
    this.storage.remove('uname');
    this.router.navigate(['']);
  }

}
