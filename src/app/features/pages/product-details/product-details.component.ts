import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CustomButtonComponent } from "../../../shared/components/ui/custom-button/custom-button.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { IconComponent } from "./components/icon/icon.component";

@Component({
  selector: 'app-product-details',
  imports: [CustomButtonComponent, CarouselModule, ProductItemComponent, IconComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
private readonly _activatedRoute = inject(ActivatedRoute);
private readonly _productService=inject(ProductService);
private readonly _cartService=inject(CartService);
private readonly _wishlistService=inject(WishlistService);
productDeatils!:Product | any;
recentProducts!:Product[];
loading!:boolean;
isloadingMain!:boolean;
isloadingButton: { [productId: string]: boolean } = {};
_toastrService=inject(ToastrService);

ngOnInit(): void {
  this.getID();

  this._wishlistService.wishlistItems$.subscribe(wishlist => {
    if (this.productDeatils) {
      this.productDeatils.isInWishlist = wishlist.has(this.productDeatils._id);
    }
    this.recentProducts.forEach(product => {
      product.isInWishlist = wishlist.has(product._id);
    });
  });
}


customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
  responsive: {
    0: {
      items: 1
    }
  },
  nav: true
}

getID(){
  this._activatedRoute.paramMap.subscribe({
    next : (res:any)=>{
      this.getProductDetails(res?.params?.id);
    }
  })


}

getProductDetails(id: string) {
  this.loading = true;
  this._productService.getProductById(id).subscribe({
    next: (res) => {
      this.productDeatils = res.data;
      this.productDeatils.isInWishlist = this._wishlistService.isInWishlist(this.productDeatils._id);
      this.getReltedProducts(this.productDeatils.category._id);
      this.loading = false;
    },
    error: () => {
      this.loading = false;
    }
  });
}


getReltedProducts(categoryID: string) {
  this._productService.getProducts(categoryID).subscribe({
    next: (res) => {
      this.recentProducts = res.data;
      this.recentProducts.forEach(product => {
        product.isInWishlist = this._wishlistService.isInWishlist(product._id);
      });
    }
  });
}


addToCart(id:string){
  this.isloadingMain=true;
  this.isloadingButton[id] = true;
  this._cartService.AddProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.isloadingButton[id] = false;
      this.isloadingMain=false;
      this._toastrService.success(res.message);
    }
  })
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
