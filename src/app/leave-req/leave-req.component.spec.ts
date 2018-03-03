import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveReqComponent } from './leave-req.component';

describe('LeaveReqComponent', () => {
  let component: LeaveReqComponent;
  let fixture: ComponentFixture<LeaveReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
