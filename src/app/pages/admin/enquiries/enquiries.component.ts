import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-enquiries',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './enquiries.component.html',
  styleUrl: './enquiries.component.scss'
})
export class EnquiriesComponent  implements OnInit{

  isLoading =true;
  enquiries:any[]=[];
  currentPage = 1;

  api = 'https://mysterious-alejandra-morrisuae-99776981.koyeb.app/enquiries';
   token =
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
    http = inject(HttpClient);

  ngOnInit(): void {
    this.getEnquiries();
  }



  getEnquiries() {

    const headers = new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        });

        this.http.get<any>(`${this.api}`, { headers }).subscribe({
          next: (response) => {
            this.enquiries = response;
           
            this.isLoading = false
          },
          error: (err) => {
            console.error('Error occurred:', err);
          },
        });
  }
}
