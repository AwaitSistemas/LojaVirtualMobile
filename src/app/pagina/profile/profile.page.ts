import { StorageService } from './../../../service/storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;

  constructor(
    public nav: NavController, 
    public menu:MenuController,
    public storage: StorageService
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.email = localUser.email;
    }
  }

}
