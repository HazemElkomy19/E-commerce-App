import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _cartService=inject(CartService);
  cartDetails!:Cart;
  isLoading!:boolean;
  emptyCart!:boolean;
ngOnInit(): void {
    this.getCartItems();
}

getCartItems(){
  this.isLoading=true;
  this._cartService.getCart().subscribe({
    next: (res)=>{
      console.log(res);
      this.cartDetails=res;
      this.isLoading=false;
    }
  })
}
removeItem(id:string){
  this.isLoading=true;
  this._cartService.RemoveSpecificCartItem(id).subscribe({
    next: (res)=>{
      console.log(res);
      this.cartDetails=res;
      this.isLoading=false;
    }
  })
}

updateCartItem(id:string,count:number){
  this.isLoading=true;
  this._cartService.UpdateProductQuantity(id,`${count}`).subscribe({
    next: (res)=>{
      console.log(res);
      this.cartDetails=res;
      this.isLoading=false;
    }
  })
}

clearCart(){
  this.isLoading=true;
  this._cartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res);
      this.isLoading=false;
      if(res.message=="success"){
        this.cartDetails={} as Cart;
        this.emptyCart=true;
      }
    }
  })
}

}
