import { BookingService } from './../booking.service';
import { BookingData } from './../choosegame/booking.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-showmybookings',
  templateUrl: './showmybookings.component.html',
  styleUrls: ['./showmybookings.component.css']
})
export class ShowmybookingsComponent implements OnInit {

  sessionVal: string;
  name: string;
  status: string;
  bookingData: BookingData[];
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private serviceObject: BookingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('uname');
    // console.log(this.route.snapshot.params);
    // this.cypherText = this.route.snapshot.params.uname;
    // this.name = CryptoJs.AES.decrypt(this.cypherText.trim(), this.decPassword.trim()).toString(CryptoJs.enc.Utf8);
    // console.log(this.name);
    this.name = this.route.snapshot.params.uname;
    if (this.sessionVal !== '') {
        if (this.sessionVal === this.name) {
          this.serviceObject.getMyBookingData(this.name).subscribe((data) => {
            this.status = JSON.parse(JSON.stringify(data)).Status;
            if (this.status === 'Error') {
              alert(this.status);
            } else if (this.status === 'No_Data') {
              alert('Your Booking History is Empty!');
              this.router.navigate(['showMyBookings']);
            } else {
              this.bookingData = JSON.parse(JSON.stringify(data));
              this.router.navigate(['showMyBookings']);
            }
          });
        } else {
          this.router.navigate(['']);
        }
      } else {
        this.router.navigate(['']);
      }
  }

  cancel() {
    this.router.navigate(['player', {uname: this.name}]);
  }

  deleteBooking(uname, date, time) {
    this.serviceObject.deleteBooking(uname, date, time).subscribe((data) => {
      this.status = JSON.parse(JSON.stringify(data)).Status;
      if (this.status === 'Error') {
        alert(this.status);
      } else {
        alert(this.status);
        this.router.navigate(['player', {uname: this.name}]);
      }
    });
  }

  logout() {
    this.storage.remove('uname');
    this.router.navigate(['']);
  }

}
