import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  apiUrl = ''

  apiUrl1 = 'https://clinical-hermina-morrisuae-21fb553a.koyeb.app/'; // Replace with your API
  token = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';


  getCategories() {
    return this.http.get<any>('assets/categories.json');
  }


  getproduct(id: string) {
    return this.http.get<any>('assets/products.json');
  }


  getsubproducts(id: string) {
    this.http.post(`${this.apiUrl},`, id)
  }


  getBanners(p0: string, p1: { headers: HttpHeaders; }) {

    return this.http.get<any>(`${this.apiUrl1}/banner`);
  }

}
