import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reservation} from '../models/Reservation';
import {environment} from '../../../environments/environment';

@Injectable()

export class ReservationService {
  private baseUrl = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) {
  }

  getReservation = () => {
    return this.http.get<Array<Reservation>>(this.baseUrl);
  };

  getReservationByEmail = (email) => {
    return this.http.get<Reservation>(`${this.baseUrl}/${email}`);
  };

  addReservation = (reservation: Reservation) => {
    return this.http.post<Reservation>(this.baseUrl, { ...reservation });
  };

  deleteReservation = (email) => {
    return this.http.delete(`${this.baseUrl}/${email}`);
  };
}
