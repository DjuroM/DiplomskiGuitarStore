import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseURL = "http://127.0.0.1:8000/api/country";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Country[]> {

    return this.http.get<Country[]>(`${this.baseURL}`);

  }
}
