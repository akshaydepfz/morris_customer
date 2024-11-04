import { AfterViewChecked, AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SubscribeComponent } from '../../shared/subscribe/subscribe.component';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SubscribeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit , AfterViewChecked {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}



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
}
