import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReservationAddComponent } from './add/reservation-add.component';
import { ReservationUpdComponent } from './upd/reservation-upd.component';
import { ReservationListComponent } from './list/reservation-list.component';
import { ReservationDetailComponent } from './detail/reservation-detail.component';
import {ReservationLoginComponent} from './login/reservation-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'add/:name_reservation',
    component: ReservationAddComponent,
  },
  {
    path: 'upd/:email',
    component: ReservationUpdComponent,
  },
  {
    path: 'login',
    component: ReservationLoginComponent,
  },
  {
    path: 'list',
    component: ReservationListComponent,
  },
  {
    path: 'detail/:idReservation',
    component: ReservationDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeatureReservationsRoutingModule {
}

