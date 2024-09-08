import { Component } from '@angular/core';
import { SubscribeComponent } from '../../shared/subscribe/subscribe.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SubscribeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
