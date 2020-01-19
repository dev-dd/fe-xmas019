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
  //reservation : Reservation;
  reservations : Array<Reservation> = [];
  beaches: Beach[] = [];
  pipe = new DatePipe('en-US');
  submitted = false;
  loaded = false;
  deleted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private beachService: BeachService
  ) { 
    
  }

  ngOnInit() {
    this.getReservationDetail(this.route.snapshot.params.email);    //upload the corresponding reservation
    this.loadBeaches();     //upload all beaches in order to get the beaches photo
  }
  
  /* This function loads the reservation's details if the email passed belongs to the reservation's table */
  /*getReservationDetail(email: string) {
    this.reservationService.getReservationByEmail(email)
    .subscribe((data: Reservation) => {
      this.reservation = data;
    });
  }*/

  getReservationDetail = (email: string) => {
    this.loadBeaches();
    this.reservationService.getReservationsByEmail(email)
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
  deleteReservation(idReservation: number) {
    this.reservationService.deleteReservationById(idReservation)
      .subscribe(data => {
        document.getElementById("loadedReservations").style.display = "none";
        this.deleted = true;
        //this.router.navigate(['']);
      }, (err) => {
        console.log(err);
      });
  }

}
