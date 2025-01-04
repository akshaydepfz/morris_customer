import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,NgxPaginationModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  isLoading = true;
  currentPage = 1;
  apiUrl1 = 'https://morris.koyeb.app/categories'; // Replace with your API
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';

  http = inject(HttpClient);
  cateogories: any[] = [];
  categoryName: string = ''; // Variable to hold category name
  selectedFile: File | null = null; // Variable to hold selected file
  @ViewChild('exampleModal') modal!: ElementRef;
  @ViewChild('imageInput') imageInput!: ElementRef;

  constructor(private toastr: ToastrService){

  }
  ngOnInit(): void {
    this.getcategories();
  }
  getcategories() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.apiUrl1}`, { headers }).subscribe({
      next: (response) => {
        this.cateogories = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }

  deleteCategories(id: number) {
    this.isLoading = true;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const toastrRef = this.toastr.info('Deleting Data...', 'Please wait', {
      disableTimeOut: true,
      closeButton: true,
    });
    this.http
      .delete<number>(`${this.apiUrl1}?id=${id}`, { headers })
      .subscribe({
        next: (response) => {
          this.toastr.remove(toastrRef.toastId);
          this.toastr.success('Successfully deleted');
          this.getcategories();
          this.isLoading = false;
        },
        error: (err) => {
          this.toastr.remove(toastrRef.toastId);
          this.toastr.error('Error occurred:', err);
          this.isLoading = false;
        },
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  addCateogories(): void {
    if (!this.categoryName || !this.selectedFile) {
      alert('Please fill in all fields.');
      return;
    }
    this.isLoading = true;
    const toastrRef = this.toastr.info('Adding Data...', 'Please wait', {
      disableTimeOut: true,
      closeButton: true,
    });
    const formData = new FormData();
    formData.append('category_name', this.categoryName);
    formData.append('image', this.selectedFile);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    this.http.post(this.apiUrl1, formData, { headers }).subscribe({
      next: (response) => {
        this.toastr.remove(toastrRef.toastId);
          this.toastr.success('Category added successfully');
        this.getcategories();
        this.resetForm();
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.remove(toastrRef.toastId);
        this.toastr.error('Error adding category:', err);
        this.isLoading = false;
      },
    });
  }

  resetForm(): void {
    this.categoryName = '';
    this.selectedFile = null;
    if (this.imageInput) {
      this.imageInput.nativeElement.value = '';
    }
  }
}
