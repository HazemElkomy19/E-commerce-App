import { Component, OnInit, inject } from '@angular/core';
import { CustomButtonComponent } from "../../../shared/components/ui/custom-button/custom-button.component";
import { WishlistService } from '../../../shared/services/wishlist.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistItemComponent } from "./components/wishlist-item/wishlist-item.component";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [WishlistItemComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly _wishlistService = inject(WishlistService);
  private readonly _cartService = inject(CartService);
  wishListDetails: any[] = [];
  isLoading: boolean = false;
  isloadingButton: { [productId: string]: boolean } = {};
_toastrService=inject(ToastrService);


  ngOnInit(): void {
    this.getWishlistItems();
  }

  getWishlistItems() {
    this.isLoading = true;
    this._wishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishListDetails = res.data; // Assign the correct array
        this.isLoading = false;

      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  removeWishListItem(id:string){
    this.isLoading=true;
  this._wishlistService.RemoveSpecificWishlistItem(id).subscribe({
    next: (res)=>{
      console.log(res);
      this.wishListDetails=res.data;
      this.isLoading=false;
    }
  })
  }

  addToCart(id: string) {
    this.isloadingButton[id] = true;

    this._cartService.AddProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._toastrService.success(res.message);
        this._wishlistService.RemoveSpecificWishlistItem(id).subscribe({
          next: () => {
            // ✅ Remove item from local list after successful API response
            this.wishListDetails = this.wishListDetails.filter(product => product._id !== id);
          },
          error: (err) => console.error("Error removing from wishlist:", err)
        });
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.isloadingButton[id] = false;

      }
    });
  }
}
