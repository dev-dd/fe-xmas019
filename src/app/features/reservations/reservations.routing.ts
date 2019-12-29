import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {ReservationAddComponent} from './add/reservation-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'add/:idBeach',
    component: ReservationAddComponent,
<<<<<<< Updated upstream
=======
  },
  {
    path: 'upd/:email',
    component: ReservationUpdComponent,
>>>>>>> Stashed changes
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class FeatureReservationsRoutingModule {
}

