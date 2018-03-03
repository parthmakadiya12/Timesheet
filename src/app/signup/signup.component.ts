import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSendData } from '../model/send-data';
import { FormsModule } from '@angular/forms';
import { RestClientServiceService } from '../providers/rest-client-service.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Response } from '@angular/http';

//UserSendData
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public edited: any = false;
  private ShowModel=false;
  private token:any;
  private email:any;
  constructor(private routerX: Router, private rApi: RestClientServiceService, private http: Http) { }
  public model = new UserSendData("", "", "", "", "", "", "");
  ngOnInit() {
  }
  signin() {
    this.routerX.navigate(['LandingComponent']);
  }
  signup(data) {
    console.log("data" + JSON.stringify(data) + " " + data.name);
    this.rApi.post('/signup/psignup', {
      "name": "" + data.name, "surname": "" + data.surname, "email": "" + data.email,
      "mobile": "" + data.mobile, "password": "" + data.password, "gender": "Male", "dob": "" + data.dob
    }).subscribe((response) => {
      console.log(JSON.stringify(response));
      if(response.status=="success"){
        this.token=response.token;
        this.email=response.email;
        //this.routerX.navigate(['LandingComponent']);
        
        this.rApi.post('/emailsend', {
          "email": "" + this.email,
           "token": ""+this.token
         }).subscribe((response) => {
           console.log(JSON.stringify(response));
           if(response.status=="successEmail"){
            this.ShowModel=true;
           }
           else{
            console.log("Email not verified"); 
           }
         })
      }
    })
    //this.http.post("http://localhost:8000" + "/psignup", {"name":""+data.name,"surname":""+data.surname ,"email":""+data.email,"mobile":""+data.mobile,"password":""+data.password,"gender":"Male","dob":""+data.dob}).map((response: Response) => response.json());
  }
  verify(data){
    this.rApi.post('/emailsend/check', {
      "email": "" + this.email,
       "token": ""+this.token,
       "otp":data
     }).subscribe((response) => {
       console.log(JSON.stringify(response));
       if(response.status=="SuccessVerified"){
        this.ShowModel=false;
        this.routerX.navigate(['LandingComponent']);
       }
       else{
        console.log("Email not verified"); 
       }
     })
  }
}
