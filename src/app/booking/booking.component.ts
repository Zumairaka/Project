import { BookingService } from './../booking.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  today = new Date();
  sessionVal: string;
  name: string;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private router: Router, private serviceObject: BookingService) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('uname');
    this.name = this.serviceObject.getName();
    console.log(this.name);
    if (this.sessionVal === '') {
      this.router.navigate(['']);
    } else if (this.sessionVal === this.name) {
      this.router.navigate(['booking']);
    } else {
      this.router.navigate(['']);
    }
  }

}
