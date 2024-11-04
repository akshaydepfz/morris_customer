import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }


  apiUrl = ''


  getCategories(){
    return this.http.get<any>('assets/categories.json');
  }


  getproduct(id:string){
    return this.http.get<any>('assets/products.json');
  }


  getsubproducts(id:string){
    this.http.post(`${this.apiUrl},`,id)
  }


}
