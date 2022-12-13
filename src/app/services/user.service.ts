import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpResponse } from '../models/httpResopnse.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user!: User;
  private baseURL = "http://127.0.0.1:8000/api";



  public loggedUser = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) { }

  public setUser(user: User) {
    this.loggedUser.next(user);
  }

  public removeLoggedUser() {
    this.loggedUser.next(undefined);
  }

  public getLoggedUser() {
    return this.user;
  }


  public register(name: string, surname: string, username: string, email: string,
    password: string, password_confirmation: string): Observable<any> {

    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json');

    return this.http.post<HttpResponse>(`${this.baseURL}/register`,
      {
        name: name,
        surname: surname,
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }, { "headers": headers });
  }

  public login(email: string, password: string): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.baseURL}/login`, { "email": email, "password": password });
  }

  public logout(): Observable<HttpResponse> {
    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization', "Bearer " + localStorage.getItem('token'));
    console.log(localStorage.getItem('token'));
    console.log(headers);

    return this.http.post<HttpResponse>(`${this.baseURL}/logout`, '', { "headers": headers });
  }

  public getUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/login`, { "email": email, "password": password });
  }

  public addUser(user: User, path: string) {
    this.http.post<User>(`${this.baseURL}`, user).subscribe(
      response => {
        console.log(response)
        this.setUser(response);
        Swal.fire(
          'Welcome ' + user.username,
          'Glad to have you on board! Have fun shopping!',
          'success'
        )
        this.router.navigate([path]);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User with that email already exists',
        })
      })
  }

  public updateUser(user: any) {
    var headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization', "Bearer " + localStorage.getItem('token'));
    console.log(user);
    this.http.put<any>(`${this.baseURL}/edit/${user.id}`, user, { "headers": headers }).subscribe(
      response => {
        console.log(response);
        this.setUser(response.data);
      }
    );
  }
}
