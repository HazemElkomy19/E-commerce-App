import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);
  platformId = inject(PLATFORM_ID);



  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {

    this.loadCartCount();
  }

   loadCartCount() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCart().subscribe({
        next: (res) => {
          this.cartCount.next(res?.data?.products?.length || 0);
        },
        error: () => this.cartCount.next(0),
      });
    }
  }

  AddProductToCart(productId: string): Observable<any> {
    return this._httpClient.post(`${this._baseUrl}/cart`, { productId }).pipe(
      tap(() => this.incrementCartCount())
    );
  }

  UpdateProductQuantity(productId: string, count: string): Observable<any> {
    return this._httpClient.put(`${this._baseUrl}/cart/${productId}`, { count });
  }

  getCart(): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/cart`);
  }

  RemoveSpecificCartItem(productId: string): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/cart/${productId}`).pipe(
      tap(() => this.decrementCartCount())
    );
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/cart`).pipe(
      tap(() => this.cartCount.next(0))
    );
  }


  private incrementCartCount() {
    this.cartCount.next(this.cartCount.value + 1);
  }


  private decrementCartCount() {
    this.cartCount.next(Math.max(0, this.cartCount.value - 1));
  }
  resetCartCount() {
    this.cartCount.next(0);
  }
}


