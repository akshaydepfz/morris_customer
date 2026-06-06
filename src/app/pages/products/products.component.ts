import { Cateogory } from './../../core/models/product';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderComponent } from '../../shared/loader/loader.component';


export interface Product {
  id: number;
  name: string;
  part_number: string;
  part_description: string;
  super_ss_number: string;
  weight: string;
  hs_code: string;
  remain_part_number: string;
  coo: string;
  ref_no: string;
  image: string;

}


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService);
  isLoading = true
  cateogories: any[] = []
  apiUrl1 = 'https://clinical-hermina-morrisuae-21fb553a.koyeb.app/categories'; // Replace with your API
  token = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);
  productId: string | null = null;

  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(this.productId); // will print the id from URL

    this.getcategories()

  }

  constructor(private route: ActivatedRoute) { }

  getcategories() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.apiUrl1}`, { headers }).subscribe({
      next: (response) => {

        this.cateogories = response;
        this.isLoading = false
      },
      error: (err) => {

      },
    });
  }
}
