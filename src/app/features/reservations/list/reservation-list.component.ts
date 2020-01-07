import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReservationService } from '../../../shared/services/reservations.service';
import { Reservation } from '../../../shared/models/Reservation';
import { BeachService } from '../../../shared/services/beaches.service';
import { Beach } from '../../../shared/models/Beach';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  public reservations: Reservation[] = [];
  loaded = false;
  beaches: Beach[] = [];
  // name: string;

  filteredRes: Reservation[] = [];
  isFilterActive = false;
  filterDate: Date;
  filterBeach: string;
  filterBox = 0;

  constructor(
    private reservationService: ReservationService,
    private beachService: BeachService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent = () => {
    this.loadBeaches();
    this.reservationService.getReservations()
      .subscribe((resReservations: Array<Reservation>) => {
        this.reservations = resReservations;
        this.loaded = true;
        // recupera il nome della spiaggia e lo inserisce nel campo beach_name della prenotazione
        for (const reserv of this.reservations) {
          for (const beach of this.beaches) {
            if (reserv.idBeach === beach.idBeach) {
              reserv.beach_name = beach.name;
            }
          }
        }
        // console.log(this.reservations);
      }, err => {
        console.log(err);
        this.loaded = true;
      });
  }

  // carica la lista di tutte le spiagge
  loadBeaches() {
    this.beachService.getBeaches()
      .subscribe((resBeaches: Array<Beach>) => {
        for (const beach of resBeaches) {
          if (beach.beach_service) {
            this.beaches.push(beach);
          }
        }
        console.log(this.beaches);
      }, err => {
        this.loaded = true;
      });
  }

  // getBeachName = (idBeach) => {
  //   this.beachService.getBeachById(idBeach)
  //     .subscribe((beach: Beach) => {
  //       this.name = beach.name;
  //     }, err => {
  //       console.log(err);
  //     });
  //
  //   return this.name;
  // }

  filterReservationsByDate = () => {
    console.log('filterReservationsByDate works! ' + this.filterDate);

    if (!this.filterDate) {
      return this.resetFilter();
    }

    this.filteredRes = [];

    for (const reserv of this.reservations) {
      if (reserv.date === this.filterDate) {
        this.filteredRes.push(reserv);
      }
    }
    this.isFilterActive = true;
    this.router.navigate([this]);
    console.log(this.filteredRes);
  }

  filterReservationsByBeach = () => {
    console.log('filterReservationsByBeach works! ' + this.filterBeach);

    if (!this.filterBeach) {
      return this.resetFilter();
    }

    this.filteredRes = [];

    for (const reserv of this.reservations) {
      if (reserv.beach_name === this.filterBeach) {
        this.filteredRes.push(reserv);
      }
    }
    this.isFilterActive = true;
    this.router.navigate([this]);
    console.log(this.filteredRes);
  }

  resetFilter = () => {
    this.isFilterActive = false;
    this.router.navigate([this]);
  }

  getInfoClass = (value: boolean) => value ? 'fa fa-check' : '';

  getButtonState = () => {
    if (!this.isFilterActive) {
      return 'btn btn-secondary my-2 my-sm-0 disabled';
    } else {
      return 'btn btn-info my-2 my-sm-0';
    }
  }

  displayFilterBox = (choice) => {
    this.filterBox = choice;
  }

  goToDetail = (idReservation: number) => this.router.navigate([`reservations/detail/${idReservation}`]);
}