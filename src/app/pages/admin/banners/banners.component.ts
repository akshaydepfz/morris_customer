import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { LayoutComponent } from '../../../shared/layout/layout.component';
import { PreloaderComponent } from '../../../shared/preloader/preloader.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss',
})
export class BannersComponent implements OnInit {
  banners: any[] = [];
  isLoading = true;
  bannerTitle: string = '';
  selectedFile: File | null = null;
  @ViewChild('imageInput') imageInput!: ElementRef;
  apiUrl = 'https://immediate-heda-morrisuae-d6b96914.koyeb.app/banner';
  token ='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);

  constructor( private toastr: ToastrService){}
  ngOnInit(): void {
    this.getBanner();
  }

  getBanner() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.apiUrl}`, { headers }).subscribe({
      next: (response) => {
        this.banners = response;
        this.isLoading = false;
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

  addBanner() {
    if (!this.bannerTitle || !this.selectedFile) {
      alert('Please fill in all fields.');
      return;
    }
    this.isLoading = true;

    const toastrRef = this.toastr.info('Adding Data...', 'Please wait', {
      disableTimeOut: true,
      closeButton: true,
    });


    const formData = new FormData();
    formData.append('title', this.bannerTitle);
    formData.append('image', this.selectedFile);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    this.http.post(this.apiUrl, formData, { headers }).subscribe({
      next: (response) => {
        this.toastr.remove(toastrRef.toastId);
        this.toastr.success('Banners added successfully');
        this.getBanner();
        this.resetForm();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.remove(toastrRef.toastId);
        this.toastr.error('Error adding Banner:', err);
      },
    });
  }

  deleteBanner(id: number) {
    this.isLoading = true;
    const toastrRef = this.toastr.info('Deleting Banner...', 'Please wait', {
      disableTimeOut: true,
      closeButton: true,
    });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    this.http.delete<number>(`${this.apiUrl}?id=${id}`, { headers }).subscribe({
      next: (response) => {
        this.toastr.remove(toastrRef.toastId);
        this.toastr.success('Successfully deleted');
        this.getBanner();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error('Error occurred:', err);
      },
    });
  }

  resetForm(): void {
    this.bannerTitle = '';
    this.selectedFile = null;
    if (this.imageInput) {
      this.imageInput.nativeElement.value = '';
    }
  }
}
