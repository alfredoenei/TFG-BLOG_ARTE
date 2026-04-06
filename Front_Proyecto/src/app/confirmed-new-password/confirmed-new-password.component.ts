import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmed-new-password',
  imports: [],
  templateUrl: './confirmed-new-password.component.html',
  styleUrl: './confirmed-new-password.component.css',
})
export class ConfirmedNewPasswordComponent {
  //componente que muestra un mensaje de confirmación al usuario
  constructor(private router: Router) {}
  onSubmit() {
    //función que redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
