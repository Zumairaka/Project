import { ValidatePassword } from './must-match/validate-password';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { DatePipe } from '@angular/common';
import { NgMarqueeModule } from 'ng-marquee-improved';
import { SlickCarouselModule} from 'ngx-slick-carousel';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { ShowbookingsComponent } from './showbookings/showbookings.component';
import { UsersComponent } from './users/users.component';
import { PlayerComponent } from './player/player.component';
import { ChoosegameComponent } from './choosegame/choosegame.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ShowmybookingsComponent } from './showmybookings/showmybookings.component';
import { UserbookingComponent } from './userbooking/userbooking.component';
import { ShoweventsComponent } from './showevents/showevents.component';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    ShowbookingsComponent,
    UsersComponent,
    PlayerComponent,
    ChoosegameComponent,
    NotificationsComponent,
    DetailsComponent,
    EditComponent,
    ShowmybookingsComponent,
    UserbookingComponent,
    ShoweventsComponent,
    EventdetailsComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule,
    NgMarqueeModule,
    SlickCarouselModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
