import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseURL = "http://127.0.0.1:8000/api/brand";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseURL}`);
  }

}
