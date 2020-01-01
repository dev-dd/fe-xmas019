import { Component, OnInit } from '@angular/core';
import {Reservation} from '../../../shared/models/Reservation';
import {ReservationService} from '../../../shared/services/reservations.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {

  reservations: Array<Reservation> = [];
  loaded = false;

  constructor(
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    //this.loadReservations();
  }

  //getDate = (date: Date) => this.router.navigate([`beaches/details/${date}`]);

  
  loadReservations = (date: Date) => {
    this.reservationService.getReservationsByDate(date)
      .subscribe((resReservations: Array<Reservation>) => {

          this.reservations = resReservations;
          this.loaded = true;
          console.log(this.reservations);
        }, err => {
          console.error(err);
          this.loaded = true;
        }
      );
  };
  /*
  loadReservations = () => {
  this.reservationService.getReservations()
    .subscribe((resReservations: Array<Reservation>) => {

        this.reservations = resReservations;
        this.loaded = true;
        console.log(this.reservations);
      }, err => {
        console.error(err);
        this.loaded = true;
      }
    );
  };*/
}
