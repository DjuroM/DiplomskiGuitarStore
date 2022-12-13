import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Guitar } from '../models/guitar.model';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {

  public guitars !: Guitar[];

  private baseURL = "http://127.0.0.1:8000/api/guitar";

  public isChanged = new Subject<Guitar[]>();


  constructor(private http: HttpClient) { }

  public PagginatorGuitar(fakeGuitars: Guitar[], from: number, to: number) {
    var fakeGuitars1 = fakeGuitars.slice(from, to);
    this.isChanged.next(fakeGuitars1.slice())
  }

  public getAll(): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(`${this.baseURL}`);
  }
  public getGuitarByID(id: number): Observable<Guitar> {
    return this.http.get<Guitar>(`${this.baseURL}/${id}`);
  }
  public getAllByTypeAndBrand(brandId: number, guitarTypeId: number): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(`${this.baseURL}sBrandType/${brandId}/${guitarTypeId}`);
  }

  public getAllByType(id: number): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(`${this.baseURL}s/${id}`);
  }

  public getAllByBrand(id: number): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(`${this.baseURL}sBrand/${id}`);
  }
}