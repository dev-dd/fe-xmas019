import {Component, OnInit} from '@angular/core';

import {Reservation} from '../../../shared/models/Reservation';
import {ReservationService} from '../../../shared/services/reservations.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  reservation: Reservation;
  editResForm: FormGroup;

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }


  ngOnInit() {
    // console.log('param: ' + this.route.snapshot.params.idReservation);
    this.loadComponent(this.route.snapshot.params.idReservation);
  }

  loadComponent(idReservation) {
    this.reservationService.getReservationById(idReservation)
      .subscribe((resData: Reservation) => {
        this.reservation = resData;
        this.editResForm = this.formBuilder.group({
          idReservation: [resData.idReservation],
          idBeach: [resData.idBeach],
          name_reservation: [resData.name_reservation,
            Validators.compose([Validators.minLength(3),
            Validators.maxLength(30), Validators.required])],
          email: [resData.email, Validators.compose([Validators.required, Validators.maxLength(40)])],
          mobile: [resData.mobile, Validators.compose([Validators.required, Validators.maxLength(14)])],
          date: [resData.date, Validators.required],
          quantity: [resData.quantity],
          half_day: [resData.half_day]
        });
      }, err => {
        console.error(err);
      });
  }

  editReservation = () => {
    this.submitted = true;

    if (this.editResForm.invalid) {
      console.warn('invalid');
      return;
    }

    const reservation: Reservation = {...this.editResForm.value, idReservation: this.reservation.idReservation};

    this.reservationService.editReservation(reservation)
      .subscribe( result => {
        this.router.navigate(['../reservations/list']);
      }, err => {
        console.error(err);
      });
  };
}
