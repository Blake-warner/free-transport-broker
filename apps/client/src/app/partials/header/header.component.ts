import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public isLoggedIn!: boolean;
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn);
  }

  logout() {
    this.authService.logout();
  }

  menu: {name: string, url: string}[] = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: 'services' },
    { name: 'Join Network', url: 'join-network' },
    { name: 'Contact Us', url: 'contact-us' },
  ]

  authMenu: { name: string, url?: string}[] = [
    { name: 'Sign In', url: 'sign-in' },
    { name: 'Sign Up', url: 'sign-up' },
    { name: 'Sign Out' }
  ]
}
