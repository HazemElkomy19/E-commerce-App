import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../../shared/interfaces/product';
import { NgClass } from '@angular/common';
import { CustomButtonComponent } from "../../../../../shared/components/ui/custom-button/custom-button.component";

@Component({
  selector: 'app-icon',
  imports: [NgClass, CustomButtonComponent],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() productDeatils!:Product;

  @Output() fireAddToWishlist:EventEmitter<string>=new EventEmitter();


  handleAddToWishlist(id:string){
    console.log('customID:', id);
  this.fireAddToWishlist.emit(id);

  }
}
