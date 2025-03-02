import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

   _httpClient =inject(HttpClient)
   _baseURL=inject(API_BASE_URL);
  constructor() { }
getAllCategories() : Observable<any>{
  return this._httpClient.get(`${this._baseURL}/categories`)
}
getSubCategoryById(id:string) : Observable<any>{
  return this._httpClient.get(`${this._baseURL}/categories/${id}/subcategories`);
}
}
