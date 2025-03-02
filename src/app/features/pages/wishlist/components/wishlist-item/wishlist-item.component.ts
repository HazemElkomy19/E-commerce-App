import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../../../../shared/interfaces/product';
import { CustomButtonComponent } from "../../../../../shared/components/ui/custom-button/custom-button.component";

@Component({
  selector: 'app-wishlist-item',
  imports: [CustomButtonComponent],
  templateUrl: './wishlist-item.component.html',
  styleUrl: './wishlist-item.component.scss'
})
export class WishlistItemComponent {
  @Input() product!:Product;
  @Input() isloadingButton!:boolean;
  @Output() fireAddToCart:EventEmitter<string>=new EventEmitter();



  handleAddToCart(id:string){
    console.log('Product ID:', id);
  this.fireAddToCart.emit(id);
  }


}
