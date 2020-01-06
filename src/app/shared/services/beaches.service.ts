import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Beach } from '../models/Beach';

@Injectable()

export class BeachService {
  private baseUrl = `${environment.apiUrl}/beaches`;

  constructor(private http: HttpClient) {
  }

  getBeaches = () => {
    return this.http.get<Array<Beach>>(this.baseUrl);
  };

  getBeachById = (idBeach) => {
    return this.http.get<Beach>(`${this.baseUrl}/${idBeach}`);
  };

  insertBeach = (beach: Beach) => {
    return this.http.post<Beach>(this.baseUrl, { ...beach });
  };

  editBeach = (beach: Beach) => {
    return this.http.put(`${this.baseUrl}/${beach.idBeach}`, { ...beach });
  };

  deleteBeach = (idBeach) => {
    return this.http.delete(`${this.baseUrl}/${idBeach}`);
  };
}
