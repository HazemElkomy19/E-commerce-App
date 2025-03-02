import { Component, OnInit, inject } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { Category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private _brandsService = inject(BrandsService);
  brands!: Category[];
  subBrand!: Category | null;
  loading: boolean = false;
  showModal: boolean = false; // Control modal visibility

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log('Brands:', res.data);
        this.brands = res.data;
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });
  }

  getBrand(id: string) {
    this.loading = true;
    this.subBrand = null; // Reset previous brand data

    this._brandsService.getBrandById(id).subscribe({
      next: (res) => {
        console.log('Selected Brand:', res.data);
        this.subBrand = res.data;
        this.showModal = true;
      },
      error: (err) => {
        console.error('Error fetching brand:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
