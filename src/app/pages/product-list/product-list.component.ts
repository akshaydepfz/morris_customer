import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchPipe } from '../../core/filters/search.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink,SearchPipe,CommonModule,ReactiveFormsModule,FormsModule,LoaderComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {


  productService = inject(ProductService)
  searchQuery: string = '';
  categoryTitle = ''
  subcategory = ''
  products :any[] = []
  isLoading =true

  category!: string;
  id!: string;


  apiUrl1 = 'https://morris.koyeb.app/subcategories'; // Replace with your API
    token =
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
    http = inject(HttpClient);



  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category') || '';
    this.id = this.route.snapshot.paramMap.get('id') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('category_name', this.category)
      .set('category_type', this.id);

    this.http.get<any>(this.apiUrl1, { params, headers }).subscribe({
      next: (response) => {
        
        this.products = response || [];
        this.isLoading = false; // Hide the loader
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.isLoading = false; // Hide the loader even on error
      },
    });

    this.categoryTitle = this.category;
    this.subcategory = this.id;
  }


  loading = true;
}
