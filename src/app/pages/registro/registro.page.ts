import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {}

  async onRegister() {
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

    // Crea un nuevo usuario con Firebase Authentication
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      console.log('Usuario registrado:', userCredential);
      alert('¡Usuario registrado exitosamente!');
      this.clearForm();
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      console.error('Error en el registro:', errorMessage);
      alert('Error en el registro: ' + errorMessage);
    }
  }

  // Método para limpiar los campos del formulario
  clearForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  // Método para validar el formato del correo
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}

// import { Component, OnInit } from '@angular/core';

