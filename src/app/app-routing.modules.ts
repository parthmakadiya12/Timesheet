import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlwaysAuthGuard } from './providers/authguard-service';
import { LeaveReqComponent } from './leave-req/leave-req.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  { path: 'landing', pathMatch: 'full', component: LandingComponent },
  { path: 'landing/:errorX', pathMatch: 'full', component: LandingComponent },  
  { path: 'SignupComponent', pathMatch: 'full', component: SignupComponent },
  { path: 'LandingComponent', pathMatch: 'full', component: LandingComponent },
  { path: 'DashboardComponent', pathMatch: 'full', component: DashboardComponent , canActivate: [AlwaysAuthGuard]},
  { path: 'LeaveReqComponent', pathMatch: 'full', component: LeaveReqComponent , canActivate: [AlwaysAuthGuard]},
  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }