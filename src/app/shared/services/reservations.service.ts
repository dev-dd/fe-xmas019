import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Reservation } from '../models/Reservation';

@Injectable()

export class ReservationService {
  private baseUrl = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) {
  }

  getReservations = () => {
    return this.http.get<Array<Reservation>>(this.baseUrl);
  };
  getReservationsByEmail = (email: string) => {
    return this.http.get<Array<Reservation>>(`${this.baseUrl}/byMail/${email}`);
  };

  /*
  getReservationByEmail = (email) => {
    return this.http.get<Reservation>(`${this.baseUrl}/byMail/${email}`);
  };*/

  getReservationById = (idReservation: number) => {
    return this.http.get<Reservation>(`${this.baseUrl}/byId/${idReservation}`);
  }

  addReservation = (reservation: Reservation) => {
    return this.http.post<Reservation>(this.baseUrl, { ...reservation });
  };

  editReservation = (reservation: Reservation) => {
    return this.http.put<Reservation>(`${this.baseUrl}/${reservation.idReservation}`, { ...reservation });
  }

  /*
  deleteReservation = (email) => {
    return this.http.delete(`${this.baseUrl}/${email}`);
  };*/

  deleteReservationById = (idReservation: number) => {
    return this.http.delete(`${this.baseUrl}/id/${idReservation}`);
  }
}
