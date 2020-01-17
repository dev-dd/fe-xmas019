import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute, //componente da sbloccare in caso si voglia passare l'idBeach in automatico
    private router: Router,
  ) {
    this.reservationForm = this.formBuilder.group({
      /* portion of code that automatically passes the id of the beach passing through the detail of this */
      //idBeach: [this.activatedRoute.snapshot.params.idBeach, Validators.required],  //idBeach is passed automatically
     
      //in questa versione, l'utente può scegliere direttamente la spiaggia da una select list 
      idBeach: [null, Validators.required],
      date: ['', Validators.required],
      name_reservation: [this.activatedRoute.snapshot.params.name_reservation, Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      mobile: ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      quantity: [1],      //default value if the user doesn't change it
      half_day: [false]   //default value if the user doesn't change it
    });
  }

  ngOnInit() {
    this.listOfBeaches();     //loads all beaches when the component is launched
  }

  /* This function loads all the beaches */
  listOfBeaches = () => {
    this.beachService.getBeaches()
    .subscribe((resBeaches: Array<Beach>)=> {
      for (const beach of resBeaches) {
        if (beach.beach_service) {
          this.beaches.push(beach);
        }
      }
    }, err => {
      console.error(err);
    }
    );
  };

  /* this function allows you to add a reservation */
  addReservation = () => {
    this.submitted = true;

    if (this.reservationForm.invalid) {
      console.warn('invalid');
      return;
    }

    const reservation: Reservation = {...this.reservationForm.value};

    if(confirm("Sei sicuro di voler aggiungere questa prenotazione?") == true){   //add a confim dialog window 
      this.reservationService.addReservation(reservation)
        .subscribe(result => {
          this.reservationForm.reset();
          this.router.navigate(['']);
        }, error => {
          console.error(error);
        });

      console.log(this.reservationForm.value);
    }
   };
}
