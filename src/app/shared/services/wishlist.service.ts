import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { API_BASE_URL } from '../../token/api-token';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);
  platformId = inject(PLATFORM_ID);


  private WishlistCount = new BehaviorSubject<number>(0);
  WishlistCount$ = this.WishlistCount.asObservable();

  private wishlistItems = new BehaviorSubject<Set<string>>(new Set());
  wishlistItems$ = this.wishlistItems.asObservable();

  constructor() {

    this.loadWishlist();
  }

  // ✅ Load wishlist from API on startup
   loadWishlist() {
    if (isPlatformBrowser(this.platformId)) {
      this.getWishlist().subscribe({
        next: (res) => {
          const productIds = res?.data?.map((p: any) => p._id) || [];
          this.wishlistItems.next(new Set(productIds));
          this.WishlistCount.next(productIds.length);
        },
        error: () => {
          this.WishlistCount.next(0);
          this.wishlistItems.next(new Set());
        },
      });
    }
  }

  // ✅ Check if a product is in wishlist
  isInWishlist(productId: string): boolean {
    return this.wishlistItems.value.has(productId);
  }

  // ✅ Add product to wishlist
  AddProductToWishlist(productId: string): Observable<any> {
    return this._httpClient.post(`${this._baseUrl}/wishlist`, { productId }).pipe(
      tap(() => {
        const updatedWishlist = new Set(this.wishlistItems.value);
        updatedWishlist.add(productId);
        this.wishlistItems.next(updatedWishlist);
        this.incrementWishlistCount();
      })
    );
  }

  // ✅ Remove product from wishlist
  RemoveSpecificWishlistItem(productId: string): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/wishlist/${productId}`).pipe(
      tap(() => {
        const updatedWishlist = new Set(this.wishlistItems.value);
        updatedWishlist.delete(productId);
        this.wishlistItems.next(updatedWishlist);
        this.decrementWishlistCount();
      })
    );
  }

  getWishlist(): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/wishlist`);
  }

  private incrementWishlistCount() {
    this.WishlistCount.next(this.WishlistCount.value + 1);
  }

  private decrementWishlistCount() {
    this.WishlistCount.next(Math.max(0, this.WishlistCount.value - 1));
  }

  resetWishlistCount() {
    this.WishlistCount.next(0);
    this.wishlistItems.next(new Set());
  }
}
