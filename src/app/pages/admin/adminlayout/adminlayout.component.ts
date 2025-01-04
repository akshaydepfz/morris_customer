import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

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

  authService = inject (AuthService)
}
