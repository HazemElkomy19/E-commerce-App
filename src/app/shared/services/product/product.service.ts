import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _httpClient =inject(HttpClient)
  _baseURL=inject(API_BASE_URL);
  constructor() { }
getProducts(categoryID?:string) : Observable<any>{
  let url= categoryID?`${this._baseURL}/products?category[in]=${categoryID}`: `${this._baseURL}/products`;
  return this._httpClient.get(url);
}

getProductById(id:string) : Observable<any>{
  return this._httpClient.get(`${this._baseURL}/products/${id}`)
}
}
