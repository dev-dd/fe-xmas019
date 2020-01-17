import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-login',
  templateUrl: './reservation-login.component.html',
  styleUrls: ['./reservation-login.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ReservationLoginComponent implements OnInit {

  pwd = '';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login () {
    console.log(this.pwd);
    if (this.pwd) {
      this.router.navigate([`reservations/list`]);
    }
  }

}
