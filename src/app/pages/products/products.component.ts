import { Cateogory } from './../../core/models/product';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService);

  cateogories :any[] = []


  Cateogory =[
    {
      "categroy" :"Perkins",
      "categoryId" :"1",
      "items":[
        {
          "title" :"Parts",
          "id":1,
          "image" : "assets/categroy/cat1.png"
        },
        {
          "title" :"Engine",
          "id":2,
          "image" : "assets/categroy/cat1.png"
        },
        {
          "title" :"catalogs",
          "id":3,
          "image" : "assets/categroy/cat1.png"
        }
      ]
    },

    {
      "categroy" :"FG wilson",
      "categoryId" :"2",
      "items":[
        {
          "title" :"Parts",
          "id":1,
          "image" : "assets/categroy/cat1.png"
        },
        {
          "title" :"Engine",
          "id":2,
          "image" : "assets/categroy/cat1.png"
        },
        {
          "title" :"catalogs",
          "id":3,
          "image" : "assets/categroy/cat1.png"
        }
      ]
    },
  ]



  getcategories()  {
    this.productService.getCategories().subscribe((data)=>{

      this.cateogories =data.cateogories;
      console.log("data",data)
    })
  }

  ngOnInit(): void {
    // this.getcategories()
    this.getcategories2()
  }

  apiUrl1 = 'https://morris.koyeb.app/categories'; // Replace with your API
  token ='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);




  getcategories2() {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      });

      this.http.get<any>(`${this.apiUrl1}`, { headers }).subscribe({
        next: (response) => {
          console.log('cate Response:', response);
          this.cateogories = response;
        },
        error: (err) => {
          console.error('Error occurred:', err);
        },
      });
    }
}
