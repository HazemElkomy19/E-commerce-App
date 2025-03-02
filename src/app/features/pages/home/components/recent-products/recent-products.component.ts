import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductItemComponent } from "../../../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../../shared/services/wishlist.service';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent implements OnInit {
  private readonly _productService = inject(ProductService);
  private readonly _cartService = inject(CartService);
  private readonly _wishlistService = inject(WishlistService);
  _toastrService = inject(ToastrService);

  products: Product[] = [];
  isloadingButton: { [productId: string]: boolean } = {};

  ngOnInit(): void {
    this.getProducts();
    this._wishlistService.wishlistItems$.subscribe(wishlist => {
      this.products.forEach(product => {
        product.isInWishlist = wishlist.has(product._id);
      });
    });
  }

  getProducts() {
    this._productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.products.forEach(product => {
          product.isInWishlist = this._wishlistService.isInWishlist(product._id);
        });
      },
      error: (err) => console.error('Error:', err),
    });
  }

  addToCart(id: string) {
    this.isloadingButton[id] = true;
    this._cartService.AddProductToCart(id).subscribe({
      next: (res) => this._toastrService.success(res.message),
      error: (err) => console.error(err),
      complete: () => this.isloadingButton[id] = false,
    });
  }

  addToWishlist(id: string) {
    if (this._wishlistService.isInWishlist(id)) {
      this._wishlistService.RemoveSpecificWishlistItem(id).subscribe({
        next: () => this._toastrService.success("Removed from wishlist"),
        error: (err) => console.error(err),
      });
    } else {
      this._wishlistService.AddProductToWishlist(id).subscribe({
        next: () => this._toastrService.success("Added to wishlist"),
        error: (err) => console.error(err),
      });
    }
  }
}
