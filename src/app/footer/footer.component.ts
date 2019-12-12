import { BookingService } from './../booking.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
  }


}

