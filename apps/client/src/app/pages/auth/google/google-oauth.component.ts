import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGoogleService } from './google-oauth.service';
//import { GoogleConfigService } from './auth-config';

const MODULES: any[] = [
  FormsModule,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-google-oauth',
  standalone: true,
  imports: [
    MODULES,
  ],
  //providers: [GoogleConfigService, AuthGoogleService],
  templateUrl: './google-oauth.component.html',
  styleUrl: './google-oauth.component.css',
})
export class GoogleOauthComponent {
  private authService = inject(AuthGoogleService);

  signInWithGoogle() {
    this.authService.login();
  }
}

