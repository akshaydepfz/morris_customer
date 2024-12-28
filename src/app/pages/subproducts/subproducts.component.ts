import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../core/filters/search.pipe';
import { LoaderComponent } from '../../shared/loader/loader.component';

export interface Product {
  id: number;
  name: string;
  part_number: string;
  part_description: string;
  super_ss_number: string;
  weight: string;
  hs_code: string;
  remain_part_number: string;
  coo: string;
  ref_no: string;
  image: string;
  main_category: string;
  sub_category: string;
}

@Component({
  selector: 'app-subproducts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SearchPipe,LoaderComponent],
  templateUrl: './subproducts.component.html',
  styleUrl: './subproducts.component.scss',
})
export class SubproductsComponent implements OnInit {

  apiUrl1 = 'https://morris.koyeb.app/morrisparts';
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);
  searchQuery: string = '';
  products: Product[] = [];
  mainCategory = '';
  subacategory = '';
  enquiryForm: FormGroup;
  selectedProduct: any = null; // Track the selected product
  isLoading = true; // Track the loading state
  constructor(private fb: FormBuilder,private route: ActivatedRoute) {
    // Initialize the form group
    this.enquiryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.mainCategory = this.route.snapshot.paramMap.get('category') || '';
    this.subacategory = this.route.snapshot.paramMap.get('subcategory') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('main_category', this.mainCategory)
      .set('sub_category', this.subacategory);
      this.http.get<Product[]>(this.apiUrl1, { params, headers }).subscribe({
        next: (response) => {
          console.log('Item Response:', response);
          this.products = response;
           this.isLoading = false;
        },
        error: (err) => {
          console.error('Error occurred:', err);
        },
      });

  }

  openModal(item: any) {
    this.selectedProduct = item; // Set the selected product
    this.enquiryForm.reset(); // Clear the form each time the modal is opened
    console.log("this.selectedProduct",this.selectedProduct)
  }

  submitEnquiry() {
    if (!this.selectedProduct) {
      console.error('No product selected');
      return;
    }

    const payload = {
      part_number: this.selectedProduct.part_number,
      ...this.enquiryForm.value,
    };
    console.log("payload",payload)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // this.http.post(this.apiUrl1, payload, { headers }).subscribe({
    //   next: (response) => {
    //     console.log('Enquiry submitted successfully:', response);
    //     alert('Your enquiry has been submitted.');
    //   },
    //   error: (error) => {
    //     console.error('Error submitting enquiry:', error);
    //     alert('An error occurred while submitting your enquiry.');
    //   },
    // });
  }
}
