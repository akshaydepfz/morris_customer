import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.scss'
})
export class AdminlayoutComponent {
  isToggled = false;
  toggleSidebar(event: Event): void {
    event.preventDefault();
    this.isToggled = !this.isToggled;
  }
}
