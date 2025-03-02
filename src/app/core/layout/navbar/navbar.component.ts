import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { Cart } from '../../../shared/interfaces/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  _authService = inject(AuthService);
  _cartService = inject(CartService);
  _wishlistService = inject(WishlistService);
  _cdr = inject(ChangeDetectorRef);

  cartDetails!: Cart;
  cartCount: number = 0;
  wishlistCount: number = 0;
  isLoggedIn: any;

  ngOnInit(): void {
    this.checkLoggedInStatus();

    this._cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
      this._cdr.detectChanges();
    });

    this._wishlistService.wishlistItems$.subscribe((wishlist) => {
      this.wishlistCount = wishlist.size;
      this._cdr.detectChanges();
    });
  }

  checkLoggedInStatus() {
    this._authService.userData.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
        this._cdr.detectChanges();
      }
    });
  }

  signOut() {
    this._authService.logOut();
  }

  getCartItems() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
        this._cdr.detectChanges();
      }
    });
  }
}
