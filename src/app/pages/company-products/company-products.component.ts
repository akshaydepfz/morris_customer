import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchPipe } from '../../core/filters/search.pipe';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchPipe,
    LoaderComponent,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  templateUrl: './company-products.component.html',
  styleUrl: './company-products.component.scss',
})
export class CompanyProductsComponent implements OnInit {
  companyProducts: any[] = [];
  searchQuery: string = '';
  isLoading = true;
  enquiryForm: FormGroup;
  image: string = '';
  mainCategory = '';
  subacategory = '';
  currentPage = 1;
  enquiryApi = 'https://immediate-heda-morrisuae-d6b96914.koyeb.app/enquiries';
  selectedFile: File | null = null; // Variable to hold selected file

  apiUrl1 = 'https://immediate-heda-morrisuae-d6b96914.koyeb.app/parts/home';
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.enquiryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]*$')]],
      attachement: [''],
      comment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mainCategory = this.route.snapshot.paramMap.get('category') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const params = new HttpParams().set('main_category', this.mainCategory);
    this.http.get<any[]>(this.apiUrl1, { params, headers }).subscribe({
      next: (response) => {

        this.companyProducts = response || [];
        this.isLoading = false;
      },
      error: (err) => {

      },
    });
  }
  selectedProduct: any = null; // Track the selected product
  openModal(item: string) {
    this.selectedProduct = item;
    this.enquiryForm.reset();
  }

  submitEnquiry() {
    if (!this.selectedProduct) {
      console.error('No product selected');
      return;
    }

    if (this.fileError) {
      console.error('Invalid file: ', this.fileError);
      return;
    }
    const toastrRef = this.toastr.info('Submit enquiry...', 'Please wait', {
      disableTimeOut: true,
      closeButton: true,
    });
    const payload = new FormData();
    payload.append('part_no', this.selectedProduct.part_number);
    payload.append('email', this.enquiryForm.get('email')?.value || '');
    payload.append('name', this.enquiryForm.get('name')?.value || '');
    payload.append('phone', this.enquiryForm.get('phone')?.value || '');
    payload.append('enquiry', this.enquiryForm.get('comment')?.value || '');

    if (this.selectedFile) {
      payload.append('attachment', this.selectedFile);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    this.http
      .post(this.enquiryApi, payload, { headers, responseType: 'text' })
      .subscribe({
        next: (response: string) => {
          this.toastr.remove(toastrRef.toastId);
          this.toastr.success('Enquiry submitted successfully');
          this.enquiryForm.reset();
          this.selectedFile = null;
        },
        error: (error: any) => {
          this.toastr.success('Error submitting enquiry', error);
        },
      });
  }

  fileError: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.size > 10 * 1024 * 1024) {
        // 10MB size limit
        this.fileError = 'File size must not exceed 10MB.';
        this.selectedFile = null;
      } else {
        this.fileError = null;
        this.selectedFile = file;
      }
    }
  }

  allowOnlyPhoneNumbers(event: KeyboardEvent): void {
    const allowedChars = /^[0-9+]*$/; // Allows only numbers and the "+" symbol
    const key = event.key;

    // Prevent input if the key is not a number or "+" and it’s not already in the field
    if (
      !allowedChars.test(key) ||
      (key === '+' && (event.target as HTMLInputElement).value.includes('+'))
    ) {
      event.preventDefault();
    }
  }

  validatePaste(event: ClipboardEvent): void {
    const pastedData = event.clipboardData?.getData('text') || '';
    const allowedChars = /^[0-9+]*$/;

    // Prevent paste if the data contains invalid characters
    if (!allowedChars.test(pastedData)) {
      event.preventDefault();
    }
  }
}
