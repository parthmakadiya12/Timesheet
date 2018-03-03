import { Injectable } from '@angular/core';
import { Http,RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Headers } from '@angular/http';
import { SessionManagerService } from './session-manager.service';

@Injectable()
export class DashboardService {
  //http://localhost:8000/notes/5a527f01f829c91754e56af4
  url='http://localhost:8000';
  constructor(private http: Http,private sess:SessionManagerService) { }
  public get(apipath,params?): Observable<any> {    
    let header = new Headers();
    this.addAuthHeader(header);
    return this.http.get(this.url + apipath, { params:params, headers: header }).map((response: Response) => response.json());

  }
  public addAuthHeader(header: Headers) {
    console.log("authorizarion and email "+this.sess.getLoggedInUser().token+" "+this.sess.getLoggedInUser().email);
    header.append("authorization", this.sess.getLoggedInUser().token);
    header.append("email", this.sess.getLoggedInUser().email);
  }
  public post(apipath, data) {
    let header = new Headers();
    this.addAuthHeader(header);
    return this.http.post(this.url + apipath, data, { headers: header })
      .map((response: Response) => response.json());
  }

}
