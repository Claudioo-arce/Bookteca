import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface UserData {
  name: string;
  surname: string;
  email: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  profilePhoto: string = 'assets/default-profile.png'; // Foto inicial predeterminada
  name: string = ''; // Nombre del usuario
  surname: string = ''; // Apellido del usuario
  newPassword: string = ''; // Contraseña nueva
  confirmPassword: string = ''; // Confirmar contraseña nueva

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userDoc = await this.firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .toPromise();

        const userData = userDoc?.data() as UserData;

        if (userData) {
          this.name = userData.name;
          this.surname = userData.surname;
        }
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('Sesión cerrada');
      this.router.navigate(['/login']); // Navega a la página de login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión.');
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.profilePhoto = image.dataUrl!;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async selectPhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      this.profilePhoto = image.dataUrl!;
    } catch (error) {
      console.error('Error al seleccionar la foto:', error);
    }
  }

  passwordsMatch(): boolean {
    return this.newPassword === this.confirmPassword;
  }

  onSubmit() {
    if (!this.passwordsMatch()) {
      alert('Las contraseñas no coinciden. Intenta nuevamente.');
      return;
    }

    console.log('Formulario enviado:');
    console.log('Nombre:', this.name);
    console.log('Apellido:', this.surname);
    console.log('Nueva Contraseña:', this.newPassword);

    alert('¡Cambios guardados exitosamente!');

    this.newPassword = '';
    this.confirmPassword = '';
  }

  goToChat() {
    this.router.navigate(['/tabs/chat']); // Navega a la página de chat
  }
}
