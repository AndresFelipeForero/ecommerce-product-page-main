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
import { ActivatedRoute } from '@angular/router';

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
  activateRout = inject(ActivatedRoute);
  filterForm!: FormGroup;
  products: any[] = [];
  subscribe?: Subscription;
  showCompanys!: any[];


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
        this.showCompanys = Array.from(new Set(result.companyArray)).map(company => {
          return {company, checked: false} 
        });

        this.activateRout.queryParams.subscribe((params) => {
          if (params) {

            let companyArray: any[] = [];
            if (params['company']) {

              if (!Array.isArray(params['company'])) {
                companyArray = [...[params['company']]];
                } else if (params['company'] === undefined){
                  params['company'] = []
                }
                else {
                  companyArray = params['company'];
              }
            }
            this.showCompanys?.forEach((compCheck)=> {
              let index = companyArray.findIndex(el => el === compCheck.company)
              if (index !== -1) {
                compCheck.checked = true
              }
            })

            this.filterForm.patchValue({
              maxPrice: Math.max(...result.finalPriceArray),
              ...params,
              company: companyArray,
            });
          }
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
      this._filterStore.addFilters(this.filterForm.value);
    }
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
      this.filterForm.patchValue({ company: companyArray });
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
