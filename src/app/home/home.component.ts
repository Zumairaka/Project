import { BookingService } from './../booking.service';
import { EventData } from './../notifications/event.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public imagesUrl;
  eventData: EventData;
  status: string;
  constructor( private serviceObject: BookingService) { }

  ngOnInit() {
    this.imagesUrl = [
                      '../../assets/Images/image00.jpg',
                      '../../assets/Images/image01.jpg',
                      '../../assets/Images/image02.jpg',
                      '../../assets/Images/image03.jpg',
                      '../../assets/Images/image04.jpg',
                      '../../assets/Images/image05.jpg',
                      '../../assets/Images/image06.jpg',
                      '../../assets/Images/image07.jpg',
                      '../../assets/Images/image08.jpg',
                      '../../assets/Images/image09.jpg',
                      '../../assets/Images/image10.jpg',
                      '../../assets/Images/image11.jpg',
                      '../../assets/Images/image12.jpg',
                      '../../assets/Images/image13.jpg',
                      '../../assets/Images/image14.jpg',
                      '../../assets/Images/image15.jpg',
                      '../../assets/Images/image16.jpg',
                      '../../assets/Images/image17.jpg',
                      '../../assets/Images/image18.jpg',
                      '../../assets/Images/image19.jpg',
                      '../../assets/Images/image20.jpg',
                     ];

    this.serviceObject.getEventData().subscribe((data) => {
      this.status = JSON.parse(JSON.stringify(data)).Status;
      if (this.status === 'Error') {
        alert(this.status);
      } else {
        this.eventData = JSON.parse(JSON.stringify(data));
      }
    });
  }

}
