import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false, 
})
export class LoginPage implements OnInit {
  email: string = ''; // Correo del usuario
  password: string = ''; // Contraseña del usuario

  constructor(private router: Router) { }

  ngOnInit() {}

  onLogin() {
    if (!this.validateEmail(this.email)) {
      console.error('Correo inválido.');
      alert('Por favor, ingresa un correo válido.');
      return;
    }

    if (this.password.length < 6) {
      console.error('Contraseña inválida.');
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Simula lógica de autenticación (puedes conectar a un backend aquí)
    if (this.email === 'usuario@example.com' && this.password === '123456') {
      console.log('Inicio de sesión exitoso:', {
        email: this.email,
        password: this.password,
      });
      alert('¡Inicio de sesión exitoso!');
      this.clearForm(); // Limpia los campos del formulario
      this.router.navigate(['/chat']); // Redirige a la página chat
    } else {
      console.error('Credenciales incorrectas.');
      alert('Correo o contraseña incorrectos.');
    }
  }

  // Método para validar el formato del correo
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Método para limpiar los campos
  clearForm() {
    this.email = '';
    this.password = '';
  }
}