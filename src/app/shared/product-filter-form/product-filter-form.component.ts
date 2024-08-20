import { IproductService } from './../../services/iproduct.service';
import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-filter-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-filter-form.component.html',
  styleUrl: './product-filter-form.component.scss'
})
export class ProductFilterFormComponent {

  private fb = inject(FormBuilder)
  _productService = inject(IproductService)
  filterForm!: FormGroup;
  products: any[] = [];

  
  ngOnInit(){
    this.filterForm = this.fb.group({
      company: [''],
      minPrice: [0],
      maxPrice: [2000000],
      searchQuery: ['']
    });

    
    this.filterForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.onFormChange();
    });
  }

  onFormChange(): void {
    if (this.filterForm.valid) {
      const { company, minPrice, maxPrice, searchQuery } = this.filterForm.value;
      this._productService.getFilters(company, minPrice, maxPrice, searchQuery).subscribe((response) => {
        this.products = response.data;
        console.log(this.products)
      });
    }
  }

}
