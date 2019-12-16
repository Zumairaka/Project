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

  checkAvailable(bookingData) {
    return this.http.post('http://localhost:3000/booking/check', bookingData);
  }

  saveMyGame(bookingData) {
    return this.http.post('http://localhost:3000/booking/save', bookingData);
  }

  updateMyGame(bookingData) {
    return this.http.post('http://localhost:3000/booking/update', bookingData);
  }
}
