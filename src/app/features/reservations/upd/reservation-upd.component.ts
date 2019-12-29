import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Reservation} from '../../../shared/models/Reservation';
import {ReservationService} from '../../../shared/services/reservations.service';

@Component({
  selector: 'app-reservation-upd',
  templateUrl: './reservation-upd.component.html',
  styleUrls: ['./reservation-upd.component.css']
})
export class ReservationUpdComponent implements OnInit {
  reservation : Reservation;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService
  ) { 
    
  }

  ngOnInit() {
    this.getReservationDetail(this.route.snapshot.params.email);
  }

  getReservationDetail(email) {
    this.reservationService.getReservationByEmail(email)
      .subscribe((data: Reservation) => {
        this.reservation = data;
        console.log(data);
      });
  }

  deleteReservation(email) {
    this.reservationService.deleteReservation(email)
      .subscribe(data => {
        this.router.navigate(['/reservations']);
      }, (err) => {
        console.log(err);
      });
  }

}
