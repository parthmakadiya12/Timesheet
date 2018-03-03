import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.modules';
import { SignupComponent } from './signup/signup.component';
import { RestClientServiceService } from './providers/rest-client-service.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionManagerService } from './providers/session-manager.service';
import { AlwaysAuthGuard } from './providers/authguard-service';
import { DashboardService } from './providers/dashboard.service';
import { MomentModule } from 'angular2-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaveReqComponent } from './leave-req/leave-req.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignupComponent,
    DashboardComponent,
    LeaveReqComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule, 
    MomentModule,
    ClarityModule.forRoot(),
  ],
  providers: [RestClientServiceService,
    SessionManagerService,
    AlwaysAuthGuard,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
