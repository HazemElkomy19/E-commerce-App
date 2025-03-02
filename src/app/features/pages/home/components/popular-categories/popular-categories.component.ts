import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { Category } from '../../../../../shared/interfaces/category';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit {
 _categoriesService=inject(CategoriesService);
 categories!:Category[];


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
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 5
    }
  },
  nav: true
}

 ngOnInit(): void {
     this.getAllCategories();
 }

getAllCategories(){
  this._categoriesService.getAllCategories().subscribe({
    next: (res) => {
      console.log('Response:', res.data);
      this.categories=res.data

    },
    error: (err) => {
      console.error('Error:', err);
    },
    complete: () => {
      console.log('Complete');
    }
  });
}
}
