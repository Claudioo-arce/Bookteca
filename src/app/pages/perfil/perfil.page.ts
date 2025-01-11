import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false, 
})
export class PerfilPage implements OnInit {
  profilePhoto: string = 'assets/default-profile.png'; // Foto inicial predeterminada

  constructor() { }

  ngOnInit() {
  }

 // Tomar una foto con la cámara
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

// Seleccionar una foto desde la galería
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
}
