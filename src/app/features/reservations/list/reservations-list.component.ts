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
  }

  loadComponent = () => {
    this.reservationService.getReservations()
      .subscribe((resReservations: Array<Reservation>) => {
          for (const reservation of resReservations) {
            // this.getTraffic(beach);
            //this.sortBeaches();
          }

          this.reservations = resReservations;
          this.loaded = true;
        }, err => {
          console.error(err);
          this.loaded = true;
        }
      );
  };
}
