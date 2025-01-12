import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {
  name: string = ''; // Nombre del usuario
  surname: string = ''; // Apellido del usuario
  email: string = ''; // Correo del usuario
  password: string = ''; // Contraseña del usuario
  confirmPassword: string = ''; // Confirmación de contraseña

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit() {}

  async onRegister() {
    // Validar que los campos de nombre y apellido no estén vacíos
    if (!this.name.trim() || !this.surname.trim()) {
      alert('Por favor, completa tu nombre y apellido.');
      return;
    }

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
      // Registrar al usuario en Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      // Guardar datos adicionales (nombre y apellido) en Firestore
      await this.firestore
        .collection('users')
        .doc(userCredential.user?.uid)
        .set({
          name: this.name,
          surname: this.surname,
          email: this.email,
        });

      console.log('Usuario registrado con éxito:', userCredential);
      alert('¡Usuario registrado exitosamente!');
      this.clearForm();
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Error en el registro:', errorMessage);
      alert('Error en el registro: ' + errorMessage);
    }
  }

  // Limpia los campos del formulario
  clearForm() {
    this.name = '';
    this.surname = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  // Valida el formato del correo electrónico

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
    
}