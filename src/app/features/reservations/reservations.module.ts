import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {FeatureReservationsRoutingModule} from './reservations.routing';
import {ReservationAddComponent} from './add/reservation-add.component';
import {ReservationService} from '../../shared/services/reservations.service';
import {BeachService} from '../../shared/services/beaches.service';
import {CoreModule} from '../../core/core.module';
import {SortService} from '../../shared/services/sort.service';

@NgModule({
  declarations: [
    ReservationAddComponent
  ],
  imports: [
    CoreModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FeatureReservationsRoutingModule
  ],
  providers: [
    SortService,
    BeachService,
    ReservationService
  ],
})
export class FeatureReservationsModule {
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ReservationsModule { }
