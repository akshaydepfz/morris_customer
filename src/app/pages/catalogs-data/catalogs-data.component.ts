import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Product } from '../products/products.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../../core/filters/search.pipe';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-catalogs-data',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchPipe,
    LoaderComponent,
    NgxPaginationModule,RouterLink,],
  templateUrl: './catalogs-data.component.html',
  styleUrl: './catalogs-data.component.scss'
})
export class CatalogsDataComponent {
  apiUrl1 = 'https://mysterious-alejandra-morrisuae-99776981.koyeb.app/catalogues';
    enquiryApi = 'https://mysterious-alejandra-morrisuae-99776981.koyeb.app/enquiries';

    apiurl2 = "https://mysterious-alejandra-morrisuae-99776981.koyeb.app/morrisparts"; //change

    token ='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';

    pdfUrl='';

     countries: string[] = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
    "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
    "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
    "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo (Congo-Brazzaville)", "Democratic Republic of the Congo",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
    "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia (Federated States of)", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal",
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States of America", "Uruguay", "Uzbekistan", "Vanuatu",
    "Vatican City (Holy See)", "Venezuela", "Vietnam", "Yemen", "Zambia",
    "Zimbabwe"
  ];


    http = inject(HttpClient);
    searchQuery: string = '';
    products: any[] = [];
    mainCategory = '';
    subacategory = '';
    enquiryForm: FormGroup;
    selectedProduct: any = null;
    isLoading = true;
    currentPage = 1;
    fileError: string | null = null;
    selectedFile: File | null = null;

    constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private toastr: ToastrService
    ) {

      this.enquiryForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]*$')]],
        companyname: ['',Validators.required],
        country: ['', Validators.required],
      });
    }


    ngOnInit(): void {
      this.mainCategory = this.route.snapshot.paramMap.get('category') || '';
      this.subacategory = this.route.snapshot.paramMap.get('subcategory') || '';
      console.log("this.mainCategory",this.mainCategory);
      console.log("this.subacategory",this.subacategory);

      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      });

      const params = new HttpParams()
        .set('main_category', this.mainCategory)
        .set('sub_category', this.subacategory);

      this.http.get<any[]>(this.apiUrl1, { params, headers }).subscribe({
        next: (response) => {

          this.products = response || [];
          if (this.products.length > 0) {
      this.pdfUrl = this.products[0].pdf_url; // save pdf_url into a variable
    }
          this.isLoading = false;
        },
        error: (err) => {

        },
      });
    }

    openModal(item: any) {
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
      debugger;
      const payload = new FormData();
      payload.append('part_no', this.selectedProduct.part_number);
      payload.append('email', this.enquiryForm.get('email')?.value || '');
      payload.append('name', this.enquiryForm.get('name')?.value || '');
      payload.append('phone', this.enquiryForm.get('phone')?.value || '');
      payload.append('company_name', this.enquiryForm.get('companyname')?.value || '');
      payload.append('country', this.enquiryForm.get('country')?.value || '');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });
      this.http
        .post(this.enquiryApi, payload, { headers, responseType: 'text' })
        .subscribe({
          next: (response: string) => {
            this.toastr.remove(toastrRef.toastId);
            this.toastr.success('Enquiry submitted successfully');
            if (this.pdfUrl) {
              window.open(this.pdfUrl, '_blank');
            }

            this.enquiryForm.reset();
          },
          error: (error: any) => {

            this.toastr.remove(toastrRef.toastId);
            this.toastr.error('Enquiry submitted successfully', error);

          },
        });
    }

    // onFileSelected(event: Event): void {
    //   const input = event.target as HTMLInputElement;
    //   if (input.files && input.files.length > 0) {
    //     const file = input.files[0];

    //     if (file.size > 10 * 1024 * 1024) {
    //       // 10MB size limit
    //       this.fileError = 'File size must not exceed 10MB.';
    //       this.selectedFile = null;
    //     } else {
    //       this.fileError = null;
    //       this.selectedFile = file;
    //     }
    //   }
    // }

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



