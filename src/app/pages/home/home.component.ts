import { AfterViewChecked, Component,CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, PLATFORM_ID  } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscribeComponent } from '../../shared/subscribe/subscribe.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,SubscribeComponent,CarouselModule,CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class HomeComponent implements OnInit ,AfterViewChecked  {
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize AOS only on the client-side (browser)
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
      });
    }
  }
  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  items = [
    {
      "image":"assets/Products/p1.png",
      "Name" : "Air filters"
    },
    {
      "image":"assets/Products/p2.png",
      "Name" : "Oil filters"
    },
    {
      "image":"assets/Products/p3.png",
      "Name" : "Diesel filters"
    },
    {
      "image":"assets/Products/p4.png",
      "Name" : "Starters"
    },

    {
      "image":"assets/Products/p3.png",
      "Name" : "Starters"
    },


    {
      "image":"assets/Products/p1.png",
      "Name" : "Starters"
    },


    {
      "image":"assets/Products/p2.png",
      "Name" : "Starters"
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
    smartSpeed : 2000,
    margin:20,
    navText: ['&#8249;', '&#8250;'],
    responsive: {
      0: { items: 1, dots: false, },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 }
    },
    nav: false
  };


  customOptions2 = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    smartSpeed : 2000,
    navSpeed: 600,
    margin:20,
    navText: ['&#8249;', '&#8250;'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 5 }
    },
    nav: false
  };


}
