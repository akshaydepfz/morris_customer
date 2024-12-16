


import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';

export interface Product {
  id: number;
  part_number: string;
  remain_part_number: string;
  part_description: string;
  fg_wison_part_number: string;
  super_ss_number: string;
  weight: string;
  coo: string;
  hs_code: string;
  image: string;
  sub_category: string;
}

@Component({
  selector: 'app-adminportal',
  standalone: true,
  templateUrl: './adminportal.component.html',
  styleUrls: ['./adminportal.component.scss'],
  imports:[]
})
export class AdminportalComponent  implements OnInit, AfterViewInit  {

  apiUrl = 'https://morris.koyeb.app/part'; // Replace with your API
  token = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  products: Product[] = [];

  constructor() {}

http = inject(HttpClient)

ngAfterViewInit(): void {
}
ngOnInit(): void {
  this.getProducts();
}

//   page: number = 1; // Current page
//   limit: number = 10; // Items per page
//   hasMoreData: boolean = true; // Flag for disabling "Next" button

getProducts(){
  const headers = new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        });

     this.http.get<Product[]>(`${this.apiUrl}`, { headers }).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Confirm the structure
        this.products = [...this.products, ...response];

      },
      error: (err) => {
        console.error('Error occurred:', err);

      },
    });
  }

customers: any[] = [
  {
    "id": 2,
    "part_number": "20007",
    "remain_part_number": "",
    "part_description": "BALL",
    "fg_wison_part_number": "",
    "super_ss_number": "",
    "weight": "0.04",
    "coo": "GB",
    "hs_code": "84819000",
    "image": "",
    "sub_category": ""
},
{
    "id": 3,
    "part_number": "40014",
    "remain_part_number": "",
    "part_description": "BEARING BALL",
    "fg_wison_part_number": "",
    "super_ss_number": "",
    "weight": "0.04",
    "coo": "TW",
    "hs_code": "84833080",
    "image": "",
    "sub_category": ""
},
];

}
