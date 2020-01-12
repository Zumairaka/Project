import { DatePipe } from '@angular/common';
import { EventData } from './event.model';
import { BookingService } from './../booking.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  eventForm: FormGroup;
  eventData = new EventData(null, null, null, null);
  myDate: Date;
  today = new Date();
  submitted = false;
  status: string;
  sessionVal: string;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private datePipe: DatePipe, private serviceObject: BookingService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('admin');
    // console.log(this.sessionVal);

    if (this.sessionVal === '') {
      this.router.navigate(['']);
    } else if (this.sessionVal === 'kickoff_admin') {
      this.eventForm = this.formBuilder.group({
        ename: ['', Validators.required],
        date: ['', Validators.required],
        time: ['', Validators.required],
        details: ['', Validators.required],
      });
    } else {
      this.router.navigate(['']);
    }
  }

  get f() { return this.eventForm.controls; }

  upload() {
    this.submitted = true;
    if (this.eventForm.invalid === true) {
      return;
    }

    this.eventData.ename = this.eventForm.get('ename').value;
    this.myDate = this.eventForm.get('date').value;
    this.eventData.date = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
    this.eventData.time = this.eventForm.get('time').value;
    this.eventData.details = this.eventForm.get('details').value;

    this.serviceObject.saveEvent(this.eventData).subscribe((data) => {
      this.status = JSON.parse(JSON.stringify(data)).Status;
      if (this.status === 'Error') {
        alert(this.status);
      } else {
        alert(this.status);
        this.router.navigate(['showBookings']);
      }
    });
  }

  showEvents() {
    this.router.navigate(['showEvents']);
  }

  reset() {
    this.submitted = false;
  }

  cancel() {
    this.router.navigate(['showBookings']);
  }

}
