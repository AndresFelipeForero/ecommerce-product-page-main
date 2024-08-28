import { Component, Input, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { FilterDataService } from '../../services/filter-data.service';
import { Subscription } from 'rxjs';
import { IproductService } from '../../services/iproduct.service';

@Component({
  selector: 'app-product-filter-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-filter-form.component.html',
  styleUrl: './product-filter-form.component.scss',
})
export class ProductFilterFormComponent {
  private fb = inject(FormBuilder);
  _filterStore = inject(FilterDataService);
  _iProductService = inject(IproductService);
  filterForm!: FormGroup;
  products: any[] = [];
  subscribe?: Subscription;
  companys?: string[] = [];

  ngOnInit() {
    this._iProductService
      .getAll()
      .pipe(
        map((res: any) => {
          const finalPriceArray: number[] = [];
          const companyArray = res.data.map(({ attributes }: any) => {
            finalPriceArray.push(attributes.finalPrice);
            return attributes.company;
          });
          return { companyArray, finalPriceArray };
        })
      )
      .subscribe((result) => {
        this.companys = Array.from(new Set(result.companyArray));

        this.filterForm.patchValue({
          maxPrice: Math.max(...result.finalPriceArray),
        });
      });

    this.filterForm = this.fb.group({
      company: [[]],
      minPrice: [0, [Validators.required, Validators.min(0)]],
      maxPrice: [2000000, [Validators.required, Validators.max(2000000)]],
      searchQuery: [''],
    });

    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.onFormChange();
    });
  }

  onFormChange(): void {
    if (this.filterForm.valid) {
      delete this.filterForm.value.company;
      this._filterStore.addFilters(this.filterForm.value);
    }
    // console.log(this.companys);
  }

  companyChecked(company: string) {
    let companyArray = this.filterForm.get('company')?.value;
    let index = companyArray.findIndex(
      (element: string) => element === company
    );
    if (index === -1) {
      companyArray.push(company);
    } else {
      companyArray.splice(index, 1);
    }
    this.filterForm.patchValue({company: companyArray});
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
