import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotUsernameComponent } from './components/forgot-username/forgot-username.component';
import { SecurityMessageComponent } from './components/security-message/security-message.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginFormComponent,
    ForgotPasswordComponent,
    ForgotUsernameComponent,
    SecurityMessageComponent,

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  activeView: 'login' | 'forgotPassword' | 'forgotUsername' = 'login';
  
  constructor() {}
  
  showForgotPassword() {
    this.activeView = 'forgotPassword';
  }
  
  showForgotUsername() {
    this.activeView = 'forgotUsername';
  }
  
  showLogin() {
    this.activeView = 'login';
  }
}