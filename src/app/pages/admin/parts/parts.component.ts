import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../../core/filters/search.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parts',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule, SearchPipe,],
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.scss',
})
export class PartsComponent implements OnInit , AfterViewInit{
  searchQuery: string = '';
constructor(private toastr: ToastrService){}

  partId!: number;
  apiUrl1 = 'https://morris.koyeb.app/admin/parts'; // Replace with your API
  deleteApi = 'https://morris.koyeb.app/morrisparts';
  categoryAPI = 'https://morris.koyeb.app/categories';
  postParts = 'https://morris.koyeb.app/morrisparts';
  subCategoryAPI = 'https://morris.koyeb.app/admin/subcategory';
  updateApi = 'https://morris.koyeb.app/morrisparts';
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);
  categories: any[] = [];
  main_category: string = '';
  sub_category: string = '';
  itemName: string = '';
  part_description: string = '';
  part_number: string = '';
  super_ss_number: string = '';
  ref_no: string = '';
  coo: string = '';
  remain_part_number: string = '';
  hs_code: string = '';
  weight: string = '';
  currentPage = 1;
  previewImage: string | null = null;
  selectedFile: File | null = null;
  isLoading = true;
  Parts: any[] = [];
  subCategories: any[] = [];

  @ViewChild('imageInput') imageInput!: ElementRef;
  @ViewChild('imageupdate') imageupdate!: ElementRef;

  ngOnInit(): void {
    this.getParts();
  }

  getParts() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.apiUrl1}`, { headers }).subscribe({
      next: (response) => {
        this.Parts = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }

  ngAfterViewInit(): void {
    this.getcategories();
    this.getsubcategories();
  }
  getcategories() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.categoryAPI}`, { headers }).subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }

  getsubcategories() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.subCategoryAPI}`, { headers }).subscribe({
      next: (response) => {
        this.subCategories = response;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string; // Set the image preview
      };
      reader.readAsDataURL(this.selectedFile); // Convert file to a data URL
    }
  }



  resetForm() {
    this.main_category = '';
    this.selectedFile = null;
    if (this.imageInput) {
      this.imageInput.nativeElement.value = '';
    }
    this.partId = 0;
    this.part_number = '';
    this.part_description = '';
    this.super_ss_number = '';
    this.weight = '';
    this.hs_code = '';
    this.remain_part_number = '';
    this.coo = '';
    this.selectedFile = null;
    this.previewImage = null;
    this.main_category = '';
    this.sub_category = '';
    this.ref_no = '';
    this.itemName = '';
  }

  openModal() {
    this.resetForm()

  }

  updateParts(id: number) {

    this.resetForm()
    this.partId = id;
    const part = this.Parts.find((p) => p.id === id);
    if (part) {
      this.main_category = part.main_category;
      this.sub_category = part.sub_category;
      this.itemName = part.itemName;
      this.part_number = part.part_number;
      this.part_description = part.part_description;
      this.super_ss_number = part.super_ss_number;
      this.weight = part.weight;
      this.hs_code = part.hs_code;
      this.remain_part_number = part.remain_part_number;
      this.coo = part.coo;
      this.ref_no = part.ref_no;
      this.previewImage = part.image
        ? part.image
        : 'assets/Products/noproduct.jpg';
    } else {
      this.previewImage = 'assets/Products/noproduct.jpg';
    }
  }




  addParts(): void {
    this.isLoading = true;
    const toastrRef = this.toastr.info('Adding item...', 'Please wait', {
      disableTimeOut: true,
      closeButton: true
    });
    if (!this.main_category || !this.selectedFile) {
      alert('Please fill in all fields.');
      return;
    }
    const formData = new FormData();
    formData.append('name', this.itemName);
    formData.append('part_number', this.part_number);
    formData.append('part_description', this.part_description);
    formData.append('super_ss_number', this.super_ss_number);
    formData.append('weight', this.weight);
    formData.append('hs_code', this.hs_code);
    formData.append('remain_part_number', this.remain_part_number);
    formData.append('coo', this.coo);
    formData.append('ref_no', this.ref_no);
    formData.append('image', this.selectedFile);
    formData.append('main_category', this.main_category);
    formData.append('sub_category', this.sub_category);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    this.http.post(this.postParts, formData, { headers }).subscribe({
      next: (response) => {
        this.getParts();
        this.resetForm();
        this.isLoading = false;
        this.toastr.remove(toastrRef.toastId);
        this.toastr.success("Parts added successfully")
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.remove(toastrRef.toastId);
        this.toastr.error("Failed to add Parts.")
      },
    });
  }



  updateitem() {
    this.isLoading =true;
    const toastrRef = this.toastr.info('Updating item...', 'Please wait', {
      disableTimeOut: true,
      closeButton: true
    });


    const formData = new FormData();
    formData.append('id', this.partId.toString());
    formData.append('part_number', this.part_number || '');
    formData.append('part_description', this.part_description || '');
    formData.append('super_ss_number', this.super_ss_number || '');
    formData.append('weight', this.weight || '');
    formData.append('hs_code', this.hs_code || '');
    formData.append('remain_part_number', this.remain_part_number || '');
    formData.append('coo', this.coo || '');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    if (!this.selectedFile && this.previewImage) {
      formData.append('image', this.previewImage);
    }

    formData.append('main_category', this.main_category || '');
    formData.append('sub_category', this.sub_category || '');
    formData.append('ref_no', this.ref_no || '');
    formData.append('itemName', this.itemName || '');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http.put(this.updateApi, formData, { headers }).subscribe({
      next: (response) => {
        this.resetForm();
        this.isLoading = false;
        this.searchQuery=''
        this.getParts();
        this.toastr.remove(toastrRef.toastId);
        this.toastr.success('Update Successful', 'Success');
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.remove(toastrRef.toastId);
        this.toastr.error('An error occurred while updating the part.', err.error?.message);
      },

    });
  }


  deleteParts(id: number) {
    this.isLoading = true;
    const toastrRef = this.toastr.warning('Deleting item', 'Please wait', {
      disableTimeOut: true,
      closeButton: true
    });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    this.http
      .delete<number>(`${this.deleteApi}?id=${id}`, { headers })
      .subscribe({
        next: (response) => {
         
          this.isLoading = false;
          this.toastr.remove(toastrRef.toastId);
          this.toastr.success("Successfully deleted")
          this.getParts();
          this.searchQuery =''
        },
        error: (err) => {
        this.isLoading = false;
        this.toastr.remove(toastrRef.toastId);
        this.toastr.error('An error occurred while deleting');
        },
      });
  }
}
