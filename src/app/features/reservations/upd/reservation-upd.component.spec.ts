import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationUpdComponent } from './reservation-upd.component';

describe('ReservationUpdComponent', () => {
  let component: ReservationUpdComponent;
  let fixture: ComponentFixture<ReservationUpdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationUpdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationUpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
