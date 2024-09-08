import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }





  getproducts(){
    return this.http.get('');
  }


  getproduct(id:string){
    return this.http.get('');
  }

}
