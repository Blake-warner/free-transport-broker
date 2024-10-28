import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menu: {name: string, url: string}[] = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: 'services' },
    { name: 'Join Network', url: 'join-network' },
    { name: 'Contact Us', url: 'contact-us' },
    { name: 'Sign In', url: 'sign-in' },
    { name: 'Sign Up', url: 'sign-up' },
  ]
}
