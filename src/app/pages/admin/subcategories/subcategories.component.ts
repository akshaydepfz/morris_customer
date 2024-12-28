import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss',
})
export class SubcategoriesComponent implements OnInit {
  isLoading =true;
  subCategories: any[] = [];
  cateogories: any[] = [];
  apiUrl1 = 'https://morris.koyeb.app/admin/subcategory'; // Replace with your API
  postapi = 'https://morris.koyeb.app/subcategory'; // Replace with your API
  catapi = 'https://morris.koyeb.app/categories'; // Replace with your API
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);

  categoryName: string = '';
  selectedFile: File | null = null;
  subCategoryName: string = '';
  @ViewChild('imageInput') imageInput!: ElementRef;


  ngOnInit(): void {
    this.getsubcategories();
  }

  getsubcategories() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.apiUrl1}`, { headers }).subscribe({
      next: (response) => {
        this.subCategories = response;
        this.isLoading= false;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }

  getcategories() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.catapi}`, { headers }).subscribe({
      next: (response) => {
        this.cateogories = response;
      },
      error: (err) => {
        this.isLoading =false;
        console.error('Error occurred:', err);
      },
    });
  }
  showModal() {
    this.getcategories();
  }

  deleteCategories(id: number) {
    this.isLoading =true;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    console.log('Deleting category with ID:', id);

    this.http
      .delete<number>(`${this.apiUrl1}?id=${id}`, { headers })
      .subscribe({
        next: (response) => {
          console.log('Successfully deleted:', response);
          this.getsubcategories();
        },
        error: (err) => {
          this.isLoading =false;
          console.error('Error occurred:', err);
        },
      });
  }

  addSubCateogories() {

    if (!this.categoryName || !this.selectedFile) {
      alert('Please fill in all fields.');
      return;
    }
    this.isLoading =true;
    const formData = new FormData();
    formData.append('Sub_category_name', this.subCategoryName);
    formData.append('category_name', this.categoryName);
    formData.append('image', this.selectedFile);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    this.http.post(this.postapi, formData, { headers }).subscribe({
      next: (response) => {
        console.log('Category added successfully:', response);
        this.getcategories();
        this.resetForm();
      },
      error: (err) => {
        this.isLoading =false;
        console.error('Error adding category:', err);
        alert('Failed to add category.');
      },
    });


  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  resetForm(): void {
    this.categoryName = '';
    this.selectedFile = null;
    if (this.imageInput) {
      this.imageInput.nativeElement.value = '';
    }
  }
}
