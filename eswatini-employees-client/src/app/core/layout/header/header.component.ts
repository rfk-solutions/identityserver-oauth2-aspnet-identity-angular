import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
readonly auth = inject(AuthService);
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((state) => !state);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
