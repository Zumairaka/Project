import { BookingService } from './../booking.service';
import { BookingData } from './../choosegame/booking.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-showbookings',
  templateUrl: './showbookings.component.html',
  styleUrls: ['./showbookings.component.css']
})
export class ShowbookingsComponent implements OnInit {

  sessionVal;
  bookingData: BookingData[];
  status: string;
  message: string;
  flag = true;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private serviceObject: BookingService, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('admin');
    // console.log(this.sessionVal);

    if (this.sessionVal === '') {
      this.router.navigate(['']);

    } else if (this.sessionVal === 'kickoff_admin') {

      this.serviceObject.getBookingData().subscribe((data) => {
        this.status = JSON.parse(JSON.stringify(data)).Status;
        if (this.status === 'Error') {
          alert(this.status);
        } else if (this.status === 'No_Data') {
          this.message = 'No Bookings';
        } else {
          this.bookingData = JSON.parse(JSON.stringify(data));
        }
      });
      this.router.navigate(['showBookings']);

    } else {
      this.router.navigate(['']);
    }
  }

  cancel() {
    this.router.navigate(['showBookings']);
  }

  deleteBooking(uname, date, time) {
    this.serviceObject.deleteBooking(uname, date, time).subscribe((data) => {
      this.status = JSON.parse(JSON.stringify(data)).Status;
      if (this.status === 'Error') {
        alert(this.status);
      } else {
        alert(this.status);
        this.ngOnInit();
      }
    });
  }

  viewDetails(uname) {
    this.router.navigate(['details', {name: uname, flg: this.flag}]);
  }

  showUsers() {
    this.router.navigate(['users']);
  }

  notifications() {
    this.router.navigate(['notifications']);
  }

  logout(): void {
    this.storage.remove('admin');
    this.router.navigate(['']);
  }

}


