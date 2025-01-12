import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {}

  async onLogin() {
    try {
      // Autenticación con Firebase
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      console.log('Inicio de sesión exitoso:', userCredential);
      alert('¡Inicio de sesión exitoso!');

      // Limpia los campos del formulario
      this.clearForm();

      // Redirige a la página "chat"
      this.router.navigateByUrl('/tabs/chat', { replaceUrl: true });

    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      console.error('Error al iniciar sesión:', errorMessage);
      alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
  }
  clearForm() {
    this.email = '';
    this.password = '';
  }
}
