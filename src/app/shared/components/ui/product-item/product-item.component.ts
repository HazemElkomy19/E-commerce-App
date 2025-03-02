import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CustomButtonComponent } from "../custom-button/custom-button.component";
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [CustomButtonComponent,RouterLink,NgClass],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
@Input() product!:Product;
@Input() isloadingButton!:boolean;
@Output() fireAddToCart:EventEmitter<string>=new EventEmitter();
@Output() fireAddToWishlist:EventEmitter<string>=new EventEmitter();


handleAddToCart(id:string){
  console.log('Product ID:', id);
this.fireAddToCart.emit(id);
}

handleAddToWishlist(id:string){
  console.log('customID:', id);
this.fireAddToWishlist.emit(id);

}
}
