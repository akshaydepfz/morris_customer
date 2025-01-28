import { Cateogory } from './../../core/models/product';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,LoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService);
  isLoading = true
  cateogories :any[] = []
  apiUrl1 = 'https://immediate-heda-morrisuae-d6b96914.koyeb.app/categories'; // Replace with your API
  token ='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);


  ngOnInit(): void {
    this.getcategories()
  }

  getcategories() {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      });

      this.http.get<any>(`${this.apiUrl1}`, { headers }).subscribe({
        next: (response) => {

          this.cateogories = response ;
          this.isLoading = false
        },
        error: (err) => {

        },
      });
    }
}
