import { BookingService } from './../booking.service';
import { EventData } from './../notifications/event.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventData: EventData;
  status: string;
  images;
  slideconfig;
  constructor( private serviceObject: BookingService) { }

  ngOnInit() {
        this.images = [
                      { img: '../../assets/Images/image00.jpg' },
                      { img: '../../assets/Images/image01.jpg' },
                      { img: '../../assets/Images/image02.jpg' },
                      { img: '../../assets/Images/image03.jpg' },
                      { img: '../../assets/Images/image04.jpg' },
                      { img: '../../assets/Images/image05.jpg' },
                      { img: '../../assets/Images/image06.jpg' },
                      { img: '../../assets/Images/image07.jpg' },
                      { img: '../../assets/Images/image08.jpg' },
                      { img: '../../assets/Images/image09.jpg' },
                      { img: '../../assets/Images/image10.jpg' },
                      { img: '../../assets/Images/image11.jpg' },
                      { img: '../../assets/Images/image12.jpg' },
                      { img: '../../assets/Images/image13.jpg' },
                      { img: '../../assets/Images/image14.jpg' },
                      { img: '../../assets/Images/image15.jpg' },
                      { img: '../../assets/Images/image16.jpg' },
                      { img: '../../assets/Images/image17.jpg' },
                      { img: '../../assets/Images/image18.jpg' },
                      { img: '../../assets/Images/image19.jpg' },
                      { img: '../../assets/Images/image20.jpg' }
                     ];

        this.slideconfig = {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      dots: true,
                      infinite: true,
                      autoplay: true,
                      autoplayspeed: 3000
                    };

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
