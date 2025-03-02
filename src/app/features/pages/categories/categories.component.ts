import { Component, inject } from '@angular/core';
import { Category } from '../../../shared/interfaces/category';
import { CategoriesService } from '../../../shared/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private _categoriesService = inject(CategoriesService);
  categories!: Category[];
  subCategories!: Category[];
  loading: boolean = false; // Track loading state
  selectedCategoryId: string | null = null; // Store selected category ID

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log('Categories:', res.data);
        this.categories = res.data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  getRelatedSubCategories(id: string) {
    this.selectedCategoryId = id; // Set selected category
    this.loading = true;

    this._categoriesService.getSubCategoryById(id).subscribe({
      next: (res) => {
        console.log('Subcategories:', res.data);
        this.subCategories = res.data;
      },
      error: (err) => {
        console.error('Error fetching subcategories:', err);
      },
      complete: () => {
        this.loading = false; // Hide loading indicator
      }
    });
  }
}
