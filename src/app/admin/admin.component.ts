import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sessionVal;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('admin');
    // console.log(this.sessionVal);

    if (this.sessionVal === '') {
      this.router.navigate(['']);
    } else if (this.sessionVal === 'kickoff_admin') {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['']);
    }
  }

  showBookings() {
    this.router.navigate(['showBookings']);
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
