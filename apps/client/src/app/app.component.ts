import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './pages/auth/auth.service';
import { LocalStorageService } from './pages/auth/local-storage.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'client';
  constructor(private readonly localstorageService: LocalStorageService, private readonly authService: AuthService){}

  ngOnInit() {
    if(this.authService.isLoggedOut()) {
      this.authService.logout();
    }
  }
}
