import { Component, inject } from '@angular/core';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../shared/services/product/product.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [ProductItemComponent,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly _productService = inject(ProductService);
  private readonly _cartService=inject(CartService);
  private readonly _wishlistService=inject(WishlistService);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  isloadingButton: { [productId: string]: boolean } = {};
_toastrService=inject(ToastrService);

  ngOnInit(): void {
    this.getProducts();
    this._wishlistService.wishlistItems$.subscribe(wishlist => {
      this.products.forEach(product => {
        product.isInWishlist = wishlist.has(product._id);
      });
      this.filteredProducts = [...this.products]; // Ensure UI updates
    });

  }

  getProducts() {
    this._productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.products.forEach(product => {
          product.isInWishlist = this._wishlistService.isInWishlist(product._id);
        });
        this.filteredProducts = this.products;

      },
      error: (err) => {
        console.error('Error:', err);
      },
      complete: () => {
        console.log('Complete');
      }
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addToCart(id: string) {
    this.isloadingButton[id] = true;

    this._cartService.AddProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._toastrService.success(res.message);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.isloadingButton[id] = false;

      }
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
