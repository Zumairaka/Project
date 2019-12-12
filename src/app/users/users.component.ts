import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  sessionVal;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private router: Router) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('admin');
    // console.log(this.sessionVal);

    if (this.sessionVal === '') {
      this.router.navigate(['']);
    } else if (this.sessionVal === 'kickoff_admin') {
      this.router.navigate(['users']);
    } else {
      this.router.navigate(['']);
    }
  }
}

