import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessegeComponent } from "../../../shared/components/ui/error-messege/error-messege.component";
import { CustomInputComponent } from "../../../shared/components/ui/custom-input/custom-input.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessegeComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy , OnInit {
  _cartService=inject(CartService);
  _wishlistService=inject(WishlistService);
  subscribtion:Subscription=new Subscription();
  apiError!:string;
  isCallinApi:boolean=false;
loginForm!: FormGroup;
_authService =inject(AuthService);
_router=inject(Router);

ngOnInit(): void {
    this.loginInitForm();
}
loginInitForm(){
  this.loginForm=new FormGroup(
    {

      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),

    });
}

login() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
  } else {
    this.apiError = '';
    this.isCallinApi = true;
    this.subscribtion = this._authService
      .loginUser(this.loginForm.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isCallinApi = false;
          localStorage.setItem('userToken', data.token);
          this._authService.saveUser();
          this._router.navigate(['/home']);


          this._cartService.loadCartCount();

          // Fetch the updated cart count
          this._cartService.getCart().subscribe({
            next: (res) => {
              console.log("Updated Cart Data:", res);
            }
          });

          this._wishlistService.loadWishlist();


          this._wishlistService.getWishlist().subscribe({
            next: (res) => {
              console.log("Updated Wishlist Data:", res);
            }
          });

        },
        error: (err) => {
          console.log(err);
          this.apiError = err.error.message;
          this.isCallinApi = false;
        },
        complete: () => {
          console.log('complete!');
        },
      });
  }
}




ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
}

}

