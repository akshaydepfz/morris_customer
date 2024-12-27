import {
  AfterViewChecked,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscribeComponent } from '../../shared/subscribe/subscribe.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';
import { ProductService } from '../../core/services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    SubscribeComponent,
    CarouselModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, AfterViewChecked {
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize AOS only on the client-side (browser)
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
      });
    }

    if (this.isBrowser) {
      // Fetch data only in the browser
      this.getbannerdata();
    }
    this.getCompanySlider()
  }
  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }


  }

  bannerlist: any[] = [];

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  items = [
    {
      image: 'assets/Products/p1.png',
      Name: 'Air filters',
    },
    {
      image: 'assets/Products/p2.png',
      Name: 'Oil filters',
    },
    {
      image: 'assets/Products/p3.png',
      Name: 'Diesel filters',
    },
    {
      image: 'assets/Products/p4.png',
      Name: 'Starters',
    },

    {
      image: 'assets/Products/p3.png',
      Name: 'Starters',
    },

    {
      image: 'assets/Products/p1.png',
      Name: 'Starters',
    },

    {
      image: 'assets/Products/p2.png',
      Name: 'Starters',
    },
  ];

  items2 = [
    'assets/brands/1.png',
    'assets/brands/2.png',
    'assets/brands/3.png',
    'assets/brands/4.png',
    'assets/brands/5.png',
  ];

  customOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    smartSpeed: 2000,
    margin: 20,
    navText: ['&#8249;', '&#8250;'],
    responsive: {
      0: { items: 1, dots: false },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: false,
  };

  customOptions2 = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    smartSpeed: 2000,
    navSpeed: 600,
    margin: 20,
    navText: ['&#8249;', '&#8250;'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 5 },
    },
    nav: false,
  };

  productService = inject(ProductService);
  apiUrl1 = 'https://morris.koyeb.app/banner'; // Replace with your API
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  http = inject(HttpClient);

  getbannerdata() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.apiUrl1}`, { headers }).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Confirm the structure
        this.bannerlist = response;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }

  apiUrl2 = 'https://morris.koyeb.app/homesliders';
  companySlider: any[] = [];

  getCompanySlider() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any>(`${this.apiUrl2}`, { headers }).subscribe({
      next: (response) => {
        console.log('CompanySLider Response:', response);
        this.companySlider = response;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }
}
