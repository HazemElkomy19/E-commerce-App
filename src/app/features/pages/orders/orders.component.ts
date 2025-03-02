import { Component, Inject, OnInit, inject } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartItem, Order } from '../../../shared/interfaces/order';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

private readonly _authService=inject(AuthService);
private readonly _orderService=inject(OrderService);
allOrders!:Order[];
cartItems!:CartItem[];
showModal:boolean=false;
ngOnInit(): void {
  this.getUserId()
}

getUserId(){
  this._authService.userData.subscribe({
    next: (res)=>{
      console.log(res);
      res.id && this.getAllOrders(res.id)

    }
  })
}
getAllOrders(id:string){
  this._orderService.getUserOrders(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.allOrders=res
    }
  })
}

openModal(index:number){
this.cartItems=this.allOrders[index].cartItems;
this.showModal=true;
}
closeModal() {
  this.showModal = false;
}

}
