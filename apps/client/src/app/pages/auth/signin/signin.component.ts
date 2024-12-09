import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import { GoogleSigninComponent } from '../google/google-signin/google-signin.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleOauthService } from '../google/google-oauth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GoogleSigninComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnDestroy, OnInit {
  googleAuthSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private googleOauthService: GoogleOauthService
  ) {}

  onSubmit(form: NgForm) {
    const payload = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.signin(payload).pipe(
      catchError(err => of(err))
    ).subscribe((authResponse) => {
      console.log(authResponse);
      this.authService.handleAuthentication(authResponse);
    })
  }

  ngOnInit(): void {
    this.googleAuthSubs = this.socialAuthService.authState.pipe(
      catchError(err => of(err)),
      switchMap((socialUser) => {
        const idToken = socialUser.idToken;
        const fullName = socialUser.name;
        console.log(socialUser);
        return this.googleOauthService.Signin(idToken, fullName);
      })
    ).subscribe((response) => {
      console.log('googleOauth respopnse: ', response);
      this.authService.handleAuthentication(response)
    })
  }

  ngOnDestroy(): void {
    this.googleAuthSubs.unsubscribe();
    console.log('on destroy');
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }
}
