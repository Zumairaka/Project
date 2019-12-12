import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  name: string;
  constructor(private http: HttpClient, private router: Router) { }

  signUpData(user) {
    return this.http.post('http://localhost:3000/signup', user);
  }

  loginVerify(user) {
    return this.http.post('http://localhost:3000/login', user);
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

}


