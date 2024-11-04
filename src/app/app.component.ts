import { HeaderComponent } from './shared/header/header.component';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { PreloaderComponent } from './shared/preloader/preloader.component';
import {  NavigationStart, NavigationEnd, Event } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,RouterLink,RouterLinkActive,PreloaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'morries_industries';

  isLoading = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;  // Show the preloader when route change starts
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false;  // Hide the preloader after route change completes
        }, 1000); // Add a delay to smooth the transition
      }
    });
  }
}
