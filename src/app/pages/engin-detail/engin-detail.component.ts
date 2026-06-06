import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-engin-detail',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, LoaderComponent],
  templateUrl: './engin-detail.component.html',
  styleUrl: './engin-detail.component.scss'
})
export class EnginDetailComponent {



  productData!: any; // Use the interface for type checking
  http = inject(HttpClient);
  singlePoductapi = 'https://clinical-hermina-morrisuae-21fb553a.koyeb.app/engines/detail';

  enquiryApi = 'https://clinical-hermina-morrisuae-21fb553a.koyeb.app/enquiries';
  token = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  selectedProduct: any = null;
  fileError: string | null = null;
  selectedFile: File | null = null;
  enquiryForm: FormGroup;
  similarProducts: any[] = [];

  images: string[] = [];
  selectedImage: string | null = null;
  loading = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
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

    this.selectedProduct = this.route.snapshot.paramMap.get('id') || '';
    this.getSelectedProduct();
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
    debugger;
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

          this.toastr.remove(toastrRef.toastId);
          this.toastr.error('Enquiry submitted successfully', error);
        },
      });
  }



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
    const allowedChars = /^[0-9+]*$/;
    const key = event.key;
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
    if (!allowedChars.test(pastedData)) {
      event.preventDefault();
    }
  }


  openModal(item: any) {
    this.selectedProduct = this.productData;
    this.enquiryForm.reset();

  }




  changeImage(img: string) {
    this.loading = true;
    this.selectedImage = img;
  }

  onImageLoad() {
    this.loading = false;
  }

  getSelectedProduct() {
    console.log("slecbro", this.selectedProduct)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    this.http.get<any>(`${this.singlePoductapi}?id=${this.selectedProduct}`, { headers }).subscribe({
      next: (response) => {
        this.productData = response;
        console.log("this.productData", this.productData)
        this.images = this.productData?.images || [];

        if (this.images.length > 0) {
          this.selectedImage = this.images[0]; // ✅ only assign when available
        } else {
          this.selectedImage = "assets/Products/noproduct.jpg"; // fallback
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }





}
