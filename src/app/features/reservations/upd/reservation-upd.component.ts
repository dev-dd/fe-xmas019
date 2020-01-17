import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Reservation } from '../../../shared/models/Reservation';
import { ReservationService } from '../../../shared/services/reservations.service';
import { Beach } from '../../../shared/models/Beach';
import { BeachService } from '../../../shared/services/beaches.service';

@Component({
  selector: 'app-reservation-upd',
  templateUrl: './reservation-upd.component.html',
  styleUrls: ['./reservation-upd.component.css']
})
export class ReservationUpdComponent implements OnInit {
  reservation : Reservation;
  editReservationForm: FormGroup;
  beaches: Beach[] = [];
  pipe = new DatePipe('en-US');
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private beachService: BeachService
  ) { 
    
  }

  ngOnInit() {
    this.getReservationDetail(this.route.snapshot.params.email);    //upload the corresponding reservation
    this.loadBeaches();     //upload all beaches in order to get the beaches names
  }
  
  /* This function loads the reservation's details if the email passed belongs to the reservation's table */
  getReservationDetail(email: string) {
    this.reservationService.getReservationByEmail(email)
    .subscribe((data: Reservation) => {
      this.reservation = data;
      this.editReservationForm = this.formBuilder.group({
        idReservation: [data.idReservation],
        idBeach: [data.idBeach],
        name_reservation: [data.name_reservation],
        email: [data.email],
        mobile: [data.mobile],
        date: [data.date],
        quantity: [data.quantity],
        half_day: [data.half_day]
      });
    });
  }

  /* This function loads all beaches */
  loadBeaches() {
    this.beachService.getBeaches()
      .subscribe((resBeaches: Array<Beach>) => {
        this.beaches = resBeaches;
      }, err => {
        console.error(err);
      });
  }

  /* This function allows to the user to edit a reservation */
  /*
  editReservation = () => {
   
    const reservation: Reservation = {...this.editReservationForm.value, idReservation: this.reservation.idReservation};
    console.log(this.editReservationForm);
    this.reservationService.editReservation(reservation)
      .subscribe( result => {
        this.router.navigate(['/reservations/add']);
      }, err => {
        console.error(err);
      });
  };*/

  /* This function allows to the user to delete a reservation */
  deleteReservation(email) {
    this.reservationService.deleteReservation(email)
      .subscribe(data => {
        this.router.navigate(['']);
      }, (err) => {
        console.log(err);
      });
  }

}
