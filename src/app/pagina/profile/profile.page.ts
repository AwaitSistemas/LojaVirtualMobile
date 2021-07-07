import { ClienteDTO } from './../../../models/cliente.dto';
import { LocalUser } from './../../../models/local_user';
import { ClienteService } from './../../../service/domain/cliente.service';
import { StorageService } from './../../../service/storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ClienteDTO } from 'src/models/cliente.dto';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //email: string;
  cliente: ClienteDTO

  constructor(
    public nav: NavController,
    public menu: MenuController,
    public storage: StorageService,
    public clienteService: ClienteService
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



}
