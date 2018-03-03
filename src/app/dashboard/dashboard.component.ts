import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionManagerService } from '../providers/session-manager.service';
import { Data } from '@angular/router/src/config';
import { RestClientServiceService } from '../providers/rest-client-service.service';
import { Router } from '@angular/router';
import { DashboardService } from '../providers/dashboard.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { ClrWizard } from '@clr/angular';
import { ClrWizardPage } from '@clr/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("wizardlg") wizardLarge: ClrWizard;
  @ViewChild("XXX") XXX: ClrWizardPage;
  private basic = true;
  private submitLoading: boolean = false;
  private todayDate: string = this.todayX();
  private day;
  private month: any;
  private workDesc: any;
  private endTime: any;
  private startTime: any;
  private uid: any;
  public count: number = 0;
  public lgOpen: boolean = false;
  private hideUpdate: boolean = true;
  sortedArray$: Observable<any[]>;
  private users: any;
  private applications: any;
  private username: string;
  private startdate: any;
  private enddate: any;
  private isError: boolean = false;
  constructor(private routerX: Router, private sess: SessionManagerService, private rApi: DashboardService) {

  }

  ngOnInit() {
    this.username = this.sess.getLoggedInUser().email;
    this.fetchAttandance();
    this.fetchApplications();
    this.startdate = this.todayX();
    this.enddate = this.todayX();
  }
  fetchAttandance() {
    this.rApi.get('/dashboard/attendance').subscribe((response) => {
      console.log(response);
      this.users = response;

      this.calculate();
    })
  }
  fetchApplications() {
    this.rApi.get('/leave').subscribe((response) => {
      console.log("response get appl " + response);
      this.applications = response;
    })
  }
  public jumpTo(page: ClrWizardPage) {
    if (page && page.completed) {
      this.wizardLarge.navService.currentPage = page;
    } else {
      this.wizardLarge.navService.setLastEnabledPageCurrent();
    }
    this.wizardLarge.open();
  }
  public jumpToThree(): void {
    this.jumpTo(this.XXX);
  }
  updateData(todayD, sTime, eTime, wDesc) {
    this.submitLoading = true;
    let data = this.sess.getLoggedInUser()
    var start = moment.duration(sTime);//removed ,hh:mm
    var end = moment.duration(eTime);
    console.log("start" + start + " end " + end);
    var min = moment.duration("08:00");
    var max = moment.duration("22:00");
    if (data && start >= min && end <= max) {
      this.rApi.post('/dashboard/attendanceUpdate', {
        "_id": this.uid, "email": data.email, "Date": todayD, "StartTime": sTime, "EndTime": eTime, "work": wDesc
      }).subscribe((response) => {
        console.log(JSON.stringify(response));
        if (response.status == "success") {
          this.submitLoading = false;
          this.fetchAttandance();
          this.fetchApplications();
          this.hideUpdate = true;
        }
        else {
          console.log("Not success in saving attendance");
        }
      })
    }
    else {
      alert("Entered Time is not valid");
    }
  }
  dataShow(data) {
    console.log(data._id);
    this.hideUpdate = false;
    //endTime startTime todayDate workDesc
    this.todayDate = data.Date;
    this.workDesc = data.work;
    this.endTime = data.EndTime;
    this.startTime = data.StartTime;
    this.uid = data._id;
  }
  submitDemo(todayD, sTime, eTime, wDesc) {
    this.submitLoading = true;
    let data = this.sess.getLoggedInUser()
    var start = moment.duration(sTime);//removed ,hh:mm
    var end = moment.duration(eTime);
    console.log("start" + start + " end " + end);
    var min = moment.duration("08:00");
    var max = moment.duration("22:00");
    if (data && start >= min && end <= max) {
      this.rApi.post('/dashboard/attendance', {
        "email": data.email, "Date": todayD, "StartTime": sTime, "EndTime": eTime, "work": wDesc
      }).subscribe((response) => {
        console.log(JSON.stringify(response));
        if (response.status == "success") {
          this.submitLoading = false;
          this.fetchAttandance();
        }
        else {
          console.log("Not success in saving attendance");
        }
      })
    }
    else {
      alert("Entered Time is not valid");
      this.submitLoading = false;
    }
  }

  todayX() {
    var date = new Date(); this.day = date.getDate(); this.month = date.getMonth() + 1; var year = date.getFullYear(); if (this.month < 10) this.month = "0" + this.month; if (this.day < 10) this.day = "0" + this.day; var today = year + "-" + this.month + "-" + this.day; console.log("todayDate");
    return today;
  }

  leaveReq(startdate, endDate, reason) {
    this.rApi.post('/leave ', {
      "email": this.sess.getLoggedInUser().email, "startDate": startdate, "endDate": endDate, "reason": reason, token: this.sess.getLoggedInUser().token
    }).subscribe((response) => {
      console.log(JSON.stringify(response));
      if (response.status == "success") {
        this.submitLoading = false;
        console.log("Success Leave Application");
        this.fetchAttandance();
      }
      else {
        console.log("Not success in applying leave application");
        this.isError = true;
      }
    })
  }
  pagechange() {
    console.log("Demo pagechange");
    this.wizardLarge.next();
  }
  editApplication() {
    console.log("edit click");
    this.wizardLarge.goTo('XXX');
  }
  calculate() {
    this.count = 0;
    var len = Object.keys(this.users).length;

    for (let i = 0; i < len; i++) {
      var start = moment.duration(this.users[i].StartTime);//removed ,hh:mm
      var end = moment.duration(this.users[i].EndTime);
      console.log("start" + start + " end " + end);
      var min = moment.duration("08:00");
      var max = moment.duration("22:00");
      console.log(start >= min);
      console.log(start <= min);

      if (start < end && start >= min && end <= max) {
        var diff = end.subtract(start);
        var add: number = parseInt(diff + "") / (60000);
        this.users[i].hours = add / 60;
        console.log(add);
        this.count = this.count + add;
      }
      else {
        alert("Entered Time is not valid.");
      }
    }
    console.log("Final count Minutes" + this.count);
  }
  expanded = [false];
}
