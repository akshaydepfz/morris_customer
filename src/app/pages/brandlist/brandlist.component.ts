import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-brandlist',
  standalone: true,
  imports: [RouterModule, LoaderComponent],
  templateUrl: './brandlist.component.html',
  styleUrl: './brandlist.component.scss'
})
export class BrandlistComponent implements OnInit {

  isLoading = true;
  currentPage = 1;
  apiUrl1 = 'https://clinical-hermina-morrisuae-21fb553a.koyeb.app/categories';
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';

  http = inject(HttpClient);
  brandList: any[] = []

  ngOnInit(): void {
    this.getbrands()
  }


  getbrands() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.apiUrl1}`, { headers }).subscribe({
      next: (response) => {
        this.brandList = response;
        console.log(this.brandList)
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }


}
