import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { ShoweventsComponent } from './showevents/showevents.component';
import { UserbookingComponent } from './userbooking/userbooking.component';
import { ShowmybookingsComponent } from './showmybookings/showmybookings.component';
import { EditComponent } from './edit/edit.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChoosegameComponent } from './choosegame/choosegame.component';
import { PlayerComponent } from './player/player.component';
import { ShowbookingsComponent } from './showbookings/showbookings.component';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component, VERSION } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
                        {path: '', component: HomeComponent},
                        {path: 'player', component: PlayerComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'signup', component: SignupComponent},
                        {path: 'admin', component: AdminComponent},
                        {path: 'showBookings', component: ShowbookingsComponent},
                        {path: 'users', component: UsersComponent},
                        {path: 'chooseGame', component: ChoosegameComponent},
                        {path: 'notifications', component: NotificationsComponent},
                        {path: 'details', component: DetailsComponent},
                        {path: 'edit', component: EditComponent},
                        {path: 'showMyBookings', component: ShowmybookingsComponent},
                        {path: 'userBookings', component: UserbookingComponent},
                        {path: 'showEvents', component: ShoweventsComponent},
                        {path: 'eventDetails', component: EventdetailsComponent},
                        {path: 'about', component: AboutComponent},
                        {path: 'contact', component: ContactComponent}
                       ];

@NgModule({
  imports: [
            RouterModule.forRoot(routes,
              {onSameUrlNavigation: 'reload'}),
            RouterModule.forChild(routes)
           ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
