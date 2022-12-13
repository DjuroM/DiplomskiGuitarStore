import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Guitar } from '../models/guitar.model';

@Injectable({
  providedIn: 'root',

})
export class OrderService {

  private baseURL = "http://127.0.0.1:8000/api/order";


  constructor(private http: HttpClient, private datePipe: DatePipe, private router: Router) { }


  public get(): Observable<Order[]> {
    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization', "Bearer " + localStorage.getItem('token'));
    return this.http.get<Order[]>(`${this.baseURL}`, { "headers": headers });

  }

  public deleteOrder(id: number) {
    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization', "Bearer " + localStorage.getItem('token'));
    this.http.delete(`${this.baseURL}/${id}`, { "headers": headers }).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  public store(order: Order) {
    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization', "Bearer " + localStorage.getItem('token'));

    this.http.post(`${this.baseURL}`, {
      "address": order.address,
      "guitars": order.guitars,
      "order_date": this.datePipe.transform(order.order_date, "yyyy-MM-dd"),
      "price": order.price
    }, { "headers": headers }).subscribe(
      response => console.log(response)
    );
  }

  public storeWithCountry(order: Order) {
    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization', "Bearer " + localStorage.getItem('token'));

    console.log(order);
    console.log(this.datePipe.transform(order.order_date, "yyyy-MM-dd"));

    this.http.post(`${this.baseURL}`, {
      "order_date": this.datePipe.transform(order.order_date, "yyyy-MM-dd"),
      "price": order.price,
      "guitars": order.guitars,
      "country_id": order.country.id,
      "address": order.address,
      "user_id": order.user.id
    }, { "headers": headers }).subscribe(
      response => {
        this.router.navigate(['/orders']);
      }
    );
  }

}


