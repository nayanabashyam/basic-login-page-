import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() forgotPasswordClick = new EventEmitter<void>();
  @Output() forgotUsernameClick = new EventEmitter<void>();
  
  loginForm: FormGroup;
  isLoading = false;
  loginError = '';
  hidePassword = true;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }
  
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.loginError = '';
    
    const { username, password, rememberMe } = this.loginForm.value;
    
    this.authService.login(username, password, rememberMe).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError = 'Invalid username or password. Please try again.';
        console.error('Login error', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  onForgotPassword() {
    this.forgotPasswordClick.emit();
  }
  
  onForgotUsername() {
    this.forgotUsernameClick.emit();
  }
  
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}