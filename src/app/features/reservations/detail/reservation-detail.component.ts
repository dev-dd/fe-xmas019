import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Reservation} from '../../../shared/models/Reservation';
import {ReservationService} from '../../../shared/services/reservations.service';
import {Beach} from '../../../shared/models/Beach';
import {BeachService} from '../../../shared/services/beaches.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  reservation: Reservation;
  editResForm: FormGroup;
  beaches: Beach[] = [];

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private beachService: BeachService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }


  ngOnInit() {
    // console.log('param: ' + this.route.snapshot.params.idReservation);
    this.loadComponent(this.route.snapshot.params.idReservation);
    this.loadBeaches();
  }

  loadComponent(idReservation) {
    this.reservationService.getReservationById(idReservation)
      .subscribe((resData: Reservation) => {
        this.reservation = resData;
        this.editResForm = this.formBuilder.group({
          idReservation: [resData.idReservation],
          idBeach: [resData.idBeach],
          name_reservation: [resData.name_reservation],
          email: [resData.email],
          mobile: [resData.mobile],
          date: [resData.date],
          quantity: [resData.quantity],
          half_day: [resData.half_day]
        });
      });
  }

  editReservation = () => {
    // if (this.editResForm.invalid) {
    //   console.warn('invalid');
    //   return;
    // }

    const reservation: Reservation = {...this.editResForm.value, idReservation: this.reservation.idReservation};

    this.reservationService.editReservation(reservation)
      .subscribe( result => {
        this.router.navigate(['../reservations/list']);
      }, err => {
        console.error(err);
      });
  };

  loadBeaches() {
    this.beachService.getBeaches()
      .subscribe((resBeaches: Array<Beach>) => {
        this.beaches = resBeaches;
        // console.log(this.beaches);
      }, err => {
        console.error(err);
      });
  }
}