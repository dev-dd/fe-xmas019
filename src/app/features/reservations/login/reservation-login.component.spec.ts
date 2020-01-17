import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationLoginComponent } from './reservation-login.component';

describe('LoginComponent', () => {
  let component: ReservationLoginComponent;
  let fixture: ComponentFixture<ReservationLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
