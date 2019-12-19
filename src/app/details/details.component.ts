import { BookingService } from './../booking.service';
import { UserData } from './../signup/signup.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  sessionVal: string;
  status: string;
  userData: UserData;
  uname: string;
  flag = false;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private route: ActivatedRoute, private serviceObject: BookingService, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('admin');
    this.uname = this.route.snapshot.params.name;
    this.flag = this.route.snapshot.params.flg;
    // console.log(this.sessionVal);

    if (this.sessionVal === '') {
      this.router.navigate(['']);

    } else if (this.sessionVal === 'kickoff_admin') {

      this.serviceObject.getUserData(this.uname).subscribe((data) => {
        this.status = JSON.parse(JSON.stringify(data)).Status;
        if (this.status === 'Error') {
          alert(this.status);
        } else {
          console.log(this.userData);
          this.userData = JSON.parse(JSON.stringify(data));
        }
      });
      this.router.navigate(['details']);

    } else {
      this.router.navigate(['']);
    }
  }

  showAll(name) {
    this.router.navigate(['userBookings', {uname: name}]);
  }

  deleteUser(uname) {
    this.serviceObject.deleteUser(uname).subscribe((data) => {
      this.status = JSON.parse(JSON.stringify(data)).Status;
      if (this.status === 'Error') {
        alert(this.status);
      } else {
        alert(this.status);
        this.serviceObject.deleteAllBooking(uname).subscribe((message) => {
          this.status = JSON.parse(JSON.stringify(message)).Status;
          if (this.status === 'Error') {
            alert(this.status);
          } else {
            alert(this.status);
            this.router.navigate(['showBookings']);
          }
        });
      }
    });
  }

  cancel(flag) {
    if (flag) {
      this.router.navigate(['showBookings']);
      } else {
        this.router.navigate(['users']);
      }
  }

  logout() {
    this.storage.remove('admin');
    this.router.navigate(['']);
  }

}
