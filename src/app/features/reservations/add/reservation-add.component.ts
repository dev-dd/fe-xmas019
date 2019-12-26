import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reservation} from '../../../shared/models/Reservation';
import {ReservationService} from '../../../shared/services/reservations.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})
export class ReservationAddComponent {

  reservationForm: FormGroup;
  pathPreview = '';

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.reservationForm = this.formBuilder.group({
      date: [null, Validators.required],
      name: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(30), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      phone: [null, Validators.compose([Validators.required, Validators.maxLength(14)])],
      quantity: [null, Validators.required],
      half_day: [false]
    });
   }
  
   addReservation = () => {
    this.submitted = true;

    if (this.reservationForm.invalid) {
      console.warn('invalid');
      return;
    }

    const reservation: Reservation = {...this.reservationForm.value};

    this.reservationService.addReservation(reservation)
      .subscribe(result => {
        this.router.navigate(['reservations/list']);
      }, error => {
        console.error(error);
      });

    console.log(this.reservationForm.value);

  };
}
