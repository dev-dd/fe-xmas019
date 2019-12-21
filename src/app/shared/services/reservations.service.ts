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

  getReservationById = (id) => {
    return this.http.get<Reservation>(`${this.baseUrl}/${id}`);
  };

  addReservation = (reservation: Reservation) => {
    return this.http.post<Reservation>(this.baseUrl, { ...reservation });
  };

  deleteReservation = (id) => {
    return this.http.delete(`${this.baseUrl}/${id}`);
  };
}
