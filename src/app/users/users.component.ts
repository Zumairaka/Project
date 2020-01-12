import { BookingService } from './../booking.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {UserData} from '../signup/signup.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userData: UserData[];
  status: string;
  message: string;
  sessionVal;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private serviceObject: BookingService, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('admin');
    // console.log(this.sessionVal);

    if (this.sessionVal === '') {
      this.router.navigate(['']);

    } else if (this.sessionVal === 'kickoff_admin') {

      this.serviceObject.getUsersData().subscribe((data) => {
        this.status = JSON.parse(JSON.stringify(data)).Status;
        if (this.status === 'Error') {
          alert(this.status);
        } else if (this.status === 'No_Data') {
          this.message = 'No Users';
        } else {
          this.userData = JSON.parse(JSON.stringify(data));
          console.log(this.userData);
        }
      });
      this.router.navigate(['users']);

    } else {
      this.router.navigate(['']);
    }
  }

  cancel() {
    this.router.navigate(['showBookings']);
  }

  viewDetails(uname) {
    this.router.navigate(['details', {name: uname}]);
  }

}
