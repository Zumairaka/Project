import { EventData } from './../notifications/event.model';
import { BookingService } from './../booking.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-showevents',
  templateUrl: './showevents.component.html',
  styleUrls: ['./showevents.component.css']
})
export class ShoweventsComponent implements OnInit {

  sessionVal;
  eventData: EventData[];
  status: string;
  message: string;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private serviceObject: BookingService, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('admin');
    // console.log(this.sessionVal);

    if (this.sessionVal === '') {
      this.router.navigate(['']);

    } else if (this.sessionVal === 'kickoff_admin') {

      this.serviceObject.getEventData().subscribe((data) => {
        this.status = JSON.parse(JSON.stringify(data)).Status;
        if (this.status === 'Error') {
          alert(this.status);
        } else if (this.status === 'No_Data') {
          this.message = 'No Bookings';
        } else {
          this.eventData = JSON.parse(JSON.stringify(data));
        }
      });
      this.router.navigate(['showEvents']);

    } else {
      this.router.navigate(['']);
    }
  }

  cancel() {
    this.router.navigate(['showBookings']);
  }

  deleteEvent(ename, date, time) {
    this.serviceObject.deleteEvent(ename, date, time).subscribe((data) => {
      this.status = JSON.parse(JSON.stringify(data)).Status;
      if (this.status === 'Error') {
        alert(this.status);
      } else {
        alert(this.status);
        this.ngOnInit();
      }
    });
  }

  viewDetails(name, day, tym) {
    this.router.navigate(['eventDetails', {ename: name, date: day, time: tym}]);
  }
}
