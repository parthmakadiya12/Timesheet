import { Injectable } from '@angular/core';
import { Http,RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Headers } from '@angular/http';

@Injectable()
export class RestClientServiceService {
  //http://localhost:8000/notes/5a527f01f829c91754e56af4
  url='http://localhost:8000';
  constructor(private http: Http) { }
  public get(apipath,params?): Observable<any> {    
    let header = new Headers();
    this.addAuthHeader(header);
    return this.http.get(this.url + apipath, { params:params }).map((response: Response) => response.json());

  }
  public addAuthHeader(header: Headers) {
    header.append("authorization", 'XXX');
    header.append("email", 'XXXX');
  }
  public post(apipath, data) {
    let header = new Headers();
    this.addAuthHeader(header);
    return this.http.post(this.url + apipath, data, { headers: header })
      .map((response: Response) => response.json());
  }

}
