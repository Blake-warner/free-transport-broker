import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { AuthService } from './pages/auth/auth.service';
import { LocalStorageService } from './pages/auth/local-storage.service';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'client';
  constructor(private readonly localstorageService: LocalStorageService, private readonly authService: AuthService){}

  ngOnInit() {
   console.log('ionit');
  }
}
