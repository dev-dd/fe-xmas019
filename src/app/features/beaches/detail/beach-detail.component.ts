import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BeachService} from '../../../shared/services/beaches.service';
import {Beach} from '../../../shared/models/Beach';
import {CurrentWeather} from '../../../shared/models/Meteo';
import {Traffic} from '../../../shared/models/Traffic';
import {WeatherService} from '../../../shared/services/weather.service';
import {TrafficService} from '../../../shared/services/traffic.service';

@Component({
  selector: 'app-beach-detail',
  templateUrl: './beach-detail.component.html',
  styleUrls: ['./beach-detail.component.css'],
})
export class BeachDetailComponent implements OnInit {
  beach: Beach;
  public email: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private beachService: BeachService,
    private weatherService: WeatherService,
    // private trafficService: TrafficService
  ) {
  }

  ngOnInit() {
    this.getBeachDetail(this.route.snapshot.params.idBeach);
  }

  getBeachDetail(idBeach) {
    this.beachService.getBeachById(idBeach)
      .subscribe((data: Beach) => {
        this.beach = data;
        this.getWeather();
        // this.getTraffic();
      });
  }

  deleteBeach(idBeach) {
    this.beachService.deleteBeach(idBeach)
      .subscribe(data => {
        this.router.navigate(['/beaches']);
      }, (err) => {
        console.log(err);
      });
  }

  getWeather = () => {
    this.weatherService.getCurrent(this.beach.city, this.beach.latitude, this.beach.longitude)
      .subscribe((weather: CurrentWeather) => {
        this.beach.weatherIcon = this.getWeatherIconPath(weather.data[0].weather.icon);
      }, err => {
        console.error(err);
      });
  };

  /*getEmail = (idRes: string) => {
    let email = document.getElementById("idRes").innerText;
    console.log(document.getElementById("idRes").innerText);
    this.router.navigate([`reservations/upd/${email}`]);
  } */
  goToReservationDetails = (email) => this.router.navigate([`reservations/upd/${email}`]);

/*  getTraffic = () => {
    this.trafficService.getTraffic(this.beach.city)
      .subscribe((traffic: Traffic) => {
        if (traffic) {
          this.beach.traffic = traffic.value;
        }
      }, err => {
        console.error(err);
      });
  };*/

  getWeatherIconPath = (icon: string): string => `https://www.weatherbit.io/static/img/icons/${icon}.png`;
  // getTrafficClass = (value: number) => value >= 80 ? 'bg-danger' : (value > 70 && value < 80 ? 'bg-warning' : 'bg-success');
  getInfoClass = (value: boolean) => value ? 'fa-check-circle text-success' : 'fa-times-circle text-danger';
}