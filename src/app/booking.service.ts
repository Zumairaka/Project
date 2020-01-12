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

  editAccountData(user) {
    return this.http.post('http://localhost:3000/signup/edit', user);
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

  getBookingDataToday(today) {
    return this.http.post('http://localhost:3000/booking/dataToday', {date: today});
  }

  getBookingData() {
    return this.http.get('http://localhost:3000/booking');
  }

  getMyBookingData(name) {
    return this.http.post('http://localhost:3000/booking/myData', {uname: name});
  }

  getUserData(uname) {
    return this.http.post('http://localhost:3000/signup/getUser', {name: uname});
  }

  getUsersData() {
    return this.http.get('http://localhost:3000/signup/getUsers');
  }

  deleteBooking(name, day, tym) {
    return this.http.post('http://localhost:3000/booking/delete', {uname: name, date: day, time: tym});
  }

  deleteAllBooking(uname) {
    return this.http.post('http://localhost:3000/booking/deleteAll', {name: uname});
  }

  deleteUser(uname) {
    return this.http.post('http://localhost:3000/signup/delete', {name: uname});
  }

  saveEvent(eventData) {
    return this.http.post('http://localhost:3000/event', eventData);
  }

  getEventData() {
    return this.http.get('http://localhost:3000/event/getEvents');
  }

  getEvent(name, day, tym) {
    return this.http.post('http://localhost:3000/event/getEvent', {ename: name, date: day, time: tym});
  }

  deleteEvent(name, day, tym) {
    return this.http.post('http://localhost:3000/event/delete', {ename: name, date: day, time: tym});
  }


}
