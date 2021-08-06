import { ClienteDTO } from './../../../models/cliente.dto';
import { LocalUser } from './../../../models/local_user';
import { ClienteService } from './../../../service/domain/cliente.service';
import { StorageService } from './../../../service/storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //email: string;
  cliente: ClienteDTO
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public nav: NavController,
    public menu: MenuController,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera
  ) { }

  ionViewWillEnter() {
    this.menu.enable(true);
  }


  ngOnInit() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {

      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
        },
          error => {
            if (error.status == 403) {
              this.nav.navigateForward('/home');
            }

          });
    }
    else {
      this.nav.navigateForward('/home');
    }

  }


  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl =
          `${API_CONFIG.backetBaseUrl}/cp${this.cliente.id}.jpg`;
      },
        error => {


        });
  }

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // Do something with the new photo
        this.picture = 'data:image/png;base64,' + imageData;
        this.cameraOn = false;
      },
      (err) => {
        // Handle error
        console.log("Camera issue: " + err);
      }
    );

  }




}
