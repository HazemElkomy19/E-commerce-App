import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessegeComponent } from "../../../shared/components/ui/error-messege/error-messege.component";
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, ErrorMessegeComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
 private readonly _activatedRoute=inject(ActivatedRoute);
 private readonly _orderService=inject(OrderService);
 cartId!:string;
 checkoutForm!:FormGroup;
 isCallingApi!:boolean;
 isCallingApiCash!:boolean;
 _router=inject(Router);
  ngOnInit(): void {
    this.getCartId();
    this.initForm();
  }

  getCartId(){
    this.cartId=this._activatedRoute.snapshot.params['cartId'];
  }
  initForm(){
    this.checkoutForm=new FormGroup ({
      details:new FormControl(null,[Validators.required]),
      city:new FormControl(null,[Validators.required]),
      phone:new FormControl(null,[Validators.required]),
    })
  }
  OnlineOrder() {
    this.isCallingApi = true;
    if (this.checkoutForm.invalid) {
      return;
    }

    const shippingAddress = {
      details: this.checkoutForm.get('details')?.value,
      phone: this.checkoutForm.get('phone')?.value,
      city: this.checkoutForm.get('city')?.value
    };

    this._orderService.OnlinePayment(this.cartId, shippingAddress).subscribe({
      next: (res) => {
        this.isCallingApi = false;
        console.log('Payment session:', res);
        if (res?.session?.url) {
         open(res.session.url); // ✅ Open Stripe
        } else {
          console.error('No session URL returned.');
        }
      },
      error: (err) => {
        this.isCallingApi = false;
        console.error('Payment Error:', err);
      }
    });
  }

  CashOrder() {
    this.isCallingApiCash = true;
    if (this.checkoutForm.invalid) {
      return;
    }

    const shippingAddress = {
      details: this.checkoutForm.get('details')?.value,
      phone: this.checkoutForm.get('phone')?.value,
      city: this.checkoutForm.get('city')?.value
    };

    this._orderService.cashOrder(this.cartId, shippingAddress).subscribe({
      next: (res) => {
        this.isCallingApiCash = false;
        console.log('Payment session:', res);
        this._router.navigate(['/allorders']);

      },
      error: (err) => {
        this.isCallingApiCash = false;
        console.error('Payment Error:', err);
      }
    });
  }





}
