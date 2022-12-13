import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseURL = "http://127.0.0.1:8000/api/review";


  constructor(private http: HttpClient, private router: Router) { }


  getById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.baseURL}/${id}`);
  }

  deleteReview(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['userProfile']);
      }
    )
  }

  updateReview(review: Review) {
    return this.http.put(`${this.baseURL}/${review.id}`, review).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['userProfile']);
      }
    )
  }

  getAllByGuitar(id: number): Observable<Review[]> {

    return this.http.get<Review[]>(`${this.baseURL}Guitar/${id}`);

  }

  getAllByUser(id: number): Observable<Review[]> {

    return this.http.get<Review[]>(`${this.baseURL}User/${id}`);

  }

  store(review: Review) {
    this.http.post(`${this.baseURL}`, {
      "user_id": review.user.id, "guitar_id": review.guitar.id
      , "review": review.review,
      "rating": review.rating
    }).subscribe(
      response => {
        console.log(response);
      }
    );
  }

}
