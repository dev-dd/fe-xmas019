import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, /*ActivatedRoute*/ } from '@angular/router';

import { Reservation } from '../../../shared/models/Reservation';
import { ReservationService } from '../../../shared/services/reservations.service';
import { Beach } from '../../../shared/models/Beach';
import { BeachService } from '../../../shared/services/beaches.service';


@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css'],
})
export class ReservationAddComponent implements OnInit {
  beaches: Array<Beach> = [];
  reservationForm: FormGroup;
  pathPreview = '';

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private beachService: BeachService,
    //private activatedRoute: ActivatedRoute, //componente da sbloccare in caso si voglia passare l'idBeach in automatico
    private router: Router,
  ) {
    this.reservationForm = this.formBuilder.group({
      /* porzione di codice che passa in automatico l'id della spiaggia passando dal dettaglio di questa */
      //idBeach: [this.activatedRoute.snapshot.params.idBeach, Validators.required],  //idBeach is passed automatically
     
      //in questa versione, l'utente può scegliere direttamente la spiaggia da una select list 
      idBeach: [null, Validators.required],
      date: ['', Validators.required],
      name_reservation: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      mobile: ['', Validators.compose([Validators.required, Validators.maxLength(14)])],
      quantity: [1],
      half_day: [false]
    });
  }

  ngOnInit() {
    this.listOfBeaches();
  }

  listOfBeaches = () => {
    this.beachService.getBeaches()
    .subscribe((resBeaches: Array<Beach>)=> {
      this.beaches = resBeaches;
    }, err => {
      console.error(err);
    }
    );
  };

  addReservation = () => {
    this.submitted = true;

    if (this.reservationForm.invalid) {
      console.warn('invalid');
      return;
    }

    const reservation: Reservation = {...this.reservationForm.value};

    this.reservationService.addReservation(reservation)
      .subscribe(result => {
        alert("La tua prenotazione è avvenuta con successo!");
        this.reservationForm.reset();
        this.router.navigate(['reservations/add']);
      }, error => {
        console.error(error);
      });

    console.log(this.reservationForm.value);
   };

   goToReservationDetails = (email) => this.router.navigate([`reservations/upd/${email}`]);
}
