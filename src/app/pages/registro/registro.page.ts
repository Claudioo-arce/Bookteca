import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false, 
})
export class RegistroPage implements OnInit {
  email: string = ''; // Correo del usuario
  password: string = ''; // Contraseña del usuario
  confirmPassword: string = ''; // Confirmación de contraseña


  constructor() { }


  ngOnInit() {}

  onRegister() {
    if (!this.validateEmail(this.email)) {
      console.error('Correo inválido.');
      alert('Por favor, ingresa un correo válido.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden.');
      alert('Las contraseñas no coinciden. Intenta nuevamente.');
      return;
    }

    if (this.password.length < 6) {
      console.error('La contraseña es demasiado corta.');
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Aquí puedes agregar la lógica para guardar al usuario
    console.log('Registro exitoso:', {
      email: this.email,
      password: this.password,
    });
    alert('¡Registro exitoso!');
  }

  // Método para validar el formato del correo
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}


