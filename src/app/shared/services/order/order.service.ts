import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { API_BASE_URL } from '../../../token/api-token';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);
  platformId = inject(PLATFORM_ID);
  _cartService=inject(CartService)

  constructor() {

  }
  cashOrder(id: string, shippingAddress: { details: string, phone: string, city: string }): Observable<any> {
    return new Observable(observer => {
      this._httpClient.post(`${this._baseUrl}/orders/${id}`, { shippingAddress }).subscribe({
        next: (res) => {
          this._cartService.resetCartCount();
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  getAllOrders():Observable<any>{
    return this._httpClient.get(`${this._baseUrl}/orders`)
  }

  getUserOrders(id:string):Observable<any>{
    return this._httpClient.get(`${this._baseUrl}/orders/user/${id}`)
  }


  OnlinePayment(id: string, shippingAddress: { details: string, city: string, phone: string }): Observable<any> {
    const returnUrl = encodeURIComponent('http://localhost:4200');

    return this._httpClient.post(
      `${this._baseUrl}/orders/checkout-session/${id}?url=http://localhost:4200`,
      { shippingAddress }
    );
}




}


