import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parts',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.scss'
})
export class PartsComponent implements OnInit {

  apiUrl1 = 'https://morris.koyeb.app/admin/parts'; // Replace with your API
  deleteApi = 'https://morris.koyeb.app/morrisparts'
  categoryAPI ='https://morris.koyeb.app/categories'
  postParts = 'https://morris.koyeb.app/morrisparts'
  subCategoryAPI ='https://morris.koyeb.app/admin/subcategory'
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);
  categories: any[] = [];
  categoryName: string = '';
  SubcategoryName: string = '';
  itemName: string = '';
  part_description:string =''
  part_number:string =''
  super_ss_number:string='';
  ref_no:string='';
  coo:string='';
  remain_part_number:string='';
  hs_code:string='';
  weight:string='';

  selectedFile: File | null = null;
  @ViewChild('imageInput') imageInput!: ElementRef;
  subCategories :any[]=[];
  Parts:any[]=[]



  isLoading= true

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




  deleteParts(id: number) {
    this.isLoading =true;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    console.log('Deleting part with ID:', id);

    this.http
      .delete<number>(`${this.deleteApi}?id=${id}`, { headers })
      .subscribe({
        next: (response) => {
          console.log('Successfully deleted:', response);
          this.getParts();
        },
        error: (err) => {
          console.error('Error occurred:', err);
        },
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  addParts(): void {
    this.isLoading= true;
    if (!this.categoryName || !this.selectedFile) {
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
    formData.append('main_category', this.categoryName);
    formData.append('sub_category', this.SubcategoryName);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    this.http.post(this.postParts, formData, { headers }).subscribe({
      next: (response) => {
        console.log('Parts added successfully:', response);
        this.getParts();
        this.resetForm();
        this.isLoading= false;
      },
      error: (err) => {
        console.error('Error adding category:', err);
        alert('Failed to add Parts.');
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


  openModal() {
    this.getcategories();
    this.getsubcategories()
  }
}
