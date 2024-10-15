import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  menu: {name: string, url: string}[] = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: 'services' },
    { name: 'Join Network', url: 'join-network' },
    { name: 'Contact Us', url: 'contact-us' },
    { name: 'Sign In', url: 'sign-in' },
  ]
}
