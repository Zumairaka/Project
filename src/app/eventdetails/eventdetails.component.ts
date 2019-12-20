import { EventData } from './../notifications/event.model';
import { BookingService } from './../booking.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css']
})
export class EventdetailsComponent implements OnInit {

  sessionVal: string;
  status: string;
  eventData: EventData;
  ename: string;
  date: string;
  time: string;
  flag = true;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private route: ActivatedRoute, private serviceObject: BookingService, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('admin');
    this.ename = this.route.snapshot.params.ename;
    this.date = this.route.snapshot.params.date;
    this.time = this.route.snapshot.params.time;
    // console.log(this.sessionVal);

    if (this.sessionVal === '') {
      this.router.navigate(['']);

    } else if (this.sessionVal === 'kickoff_admin') {

      this.serviceObject.getEvent(this.ename, this.date, this.time).subscribe((data) => {
        this.status = JSON.parse(JSON.stringify(data)).Status;
        if (this.status === 'Error') {
          alert(this.status);
        } else {
          this.eventData = JSON.parse(JSON.stringify(data));
          console.log(this.eventData);
        }
      });
      this.router.navigate(['eventDetails']);

    } else {
      this.router.navigate(['']);
    }
  }

  cancel() {
    this.router.navigate(['showEvents']);
  }

}
