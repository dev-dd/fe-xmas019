import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReservationsListComponent} from './list/reservations-list.component';
import {ReservationUpdComponent} from './upd/reservation-upd.component'
import {ReservationAddComponent} from './add/reservation-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ReservationsListComponent,
  },
  /* versione del progetto in cui la prenotazione passava attravero il dettaglio della spiaggia
  {
    path: 'add/:idBeach',
    component: ReservationAddComponent,
  },*/
  {
    path: 'add',  //la prenorazione è slegata dal dettaglio della spiaggia
    component: ReservationAddComponent,
  },
  {
    path: 'upd/:email',
    component: ReservationUpdComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class FeatureReservationsRoutingModule {
}

