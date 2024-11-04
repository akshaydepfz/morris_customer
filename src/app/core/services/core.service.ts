import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http : HttpClient) { }



  postForm(data:any) {
    this.http.post<any>('http',data);
  }
}
