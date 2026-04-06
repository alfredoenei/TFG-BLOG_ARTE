import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { AuthService } from '../../../services/connect.services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  loginError = signal(false);

  usernameChange(value: string) { this.username.set(value); }
  passwordChange(value: string) { this.password.set(value); }

  constructor(
    private connectService: ConnectService,
    private router: Router,
    private authService: AuthService
  ) {}

  async onSubmit() {
    this.loginError.set(false);

    const response = await this.connectService.getPostDirect({
      username: this.username(),
      password: this.password(),
    });

    if (response) {
      this.authService.login({
        name: this.username(),
        username: this.username(),
        role: response.role,
        image: response.profilePicture || 'https://cdn.pixabay.com/photo/2016/03/28/10/05/kitten-1285341_640.jpg',
      });
      this.router.navigate(['/']);
    } else {
      this.loginError.set(true);
    }
  }
}
