import { ShowbookingsComponent } from './showbookings/showbookings.component';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component, VERSION } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
                        {path: '', component: HomeComponent},
                        {path: 'booking', component: BookingComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'signup', component: SignupComponent},
                        {path: 'admin', component: AdminComponent},
                        {path: 'showBookings', component: ShowbookingsComponent},
                        {path: 'users', component: UsersComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
