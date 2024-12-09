import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-google-signin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.css',
})
export class GoogleSigninComponent {
  @Output() loginWithGoogle: EventEmitter<unknown> = new EventEmitter<unknown>();
  
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  createFakeGoogleWrapper = () => {
    let googleLoginWrapperButton: HTMLElement;
    if (isPlatformBrowser(this.platformId)) {
      const googleLoginWrapper = document.createElement('div');
      googleLoginWrapper.style.display = 'none';
      googleLoginWrapper.classList.add('custom-google-button');
      document.body.appendChild(googleLoginWrapper);
      window.google.accounts.id.renderButton(googleLoginWrapper, {
        type: 'icon',
        width: '200',
      });

      googleLoginWrapperButton = googleLoginWrapper.querySelector(
        'div[role=button]'
      ) as HTMLElement;
    }
    return {
      click: () => {
        googleLoginWrapperButton.click();
      }
    }
  }

  handleGoogleLogin() {
    this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
  }
}
