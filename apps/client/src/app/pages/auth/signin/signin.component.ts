import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    const payload = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.signin(payload).pipe(
      catchError(err => of(err))
    ).subscribe((authResponse) => {
      this.authService.handleAuthentication(authResponse);
    })
  }
}
