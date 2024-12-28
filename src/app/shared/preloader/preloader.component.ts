import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss'
})
export class PreloaderComponent {


}
