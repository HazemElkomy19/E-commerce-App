import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../../token/api-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  _httpClient =inject(HttpClient)
  _baseURL=inject(API_BASE_URL);
 constructor() { }
getAllBrands() : Observable<any>{
 return this._httpClient.get(`${this._baseURL}/brands`)
}
getBrandById(id:string) : Observable <any>{
  return this._httpClient.get(`${this._baseURL}/brands/${id}`)
}
}
