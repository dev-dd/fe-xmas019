import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(
    private router: Router,
  ) { 
  }

  ngOnInit() {
  }

  goToReservationAdd = (name_reservation) => this.router. navigate([`reservations/add/${name_reservation}`]);

  /* This function allows to go to the reservation's details page searching the reservation by email */
  goToReservationDetails = (email) => this.router.navigate([`reservations/upd/${email}`]);

  
}
