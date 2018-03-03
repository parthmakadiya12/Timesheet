import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { RestClientServiceService } from '../providers/rest-client-service.service';
import { SessionManagerService } from '../providers/session-manager.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public edited = false;
  public ErrorX:any=false;
  private userType="Local Users";
  constructor(private routerX: Router,private rApi:RestClientServiceService,private route: ActivatedRoute,private sess: SessionManagerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ErrorX = params['errorX'];
      console.log(this.ErrorX);

    });
  }
  signup() {
    this.routerX.navigate(['SignupComponent']);
  }
  signin(userType,username,password,remember){
    console.log(userType,username,password,remember);
    this.rApi.post('/signup/psignupchk', {
      "email": "" + username, "password": "" + password
    }).subscribe((response) => {
      console.log(JSON.stringify(response));
      if(response.status=="success"){
        this.sess.setLoggedInUser(response);
        this.routerX.navigate(['DashboardComponent']);
      }
      else{
        this.edited=true;
      }
    })
  }
}
