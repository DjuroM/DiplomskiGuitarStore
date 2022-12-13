import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Basket } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private baseURL = "http://127.0.0.1:8000/api/basket";

  constructor(private http: HttpClient, private router: Router) { }

  public addToBasket(basket: Basket) {
    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization', "Bearer " + localStorage.getItem('token'));
    this.http.post(`${this.baseURL}`, { "guitar_id": basket.guitar.id }, { "headers": headers }).subscribe(
      response => {
        this.router.navigate(['/basket'])
      }
    )
  }
  public delete(id: number) {
    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization', "Bearer " + localStorage.getItem('token'));
    this.http.delete(`${this.baseURL}/${id}`, { "headers": headers }).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  public get(id: number): Observable<Basket[]> {
    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization', "Bearer " + localStorage.getItem('token'));
    return this.http.get<Basket[]>(`${this.baseURL}`, { "headers": headers });
  }
}
