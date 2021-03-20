import { AuthService } from './../../../service/auth.service';
import { CredenciaisDTO } from './../../../models/credenciais.dto';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  creds: CredenciaisDTO= {
    email:"",
    senha:""
  }

  constructor(
      public nav: NavController, 
      public menu:MenuController,
      public auth: AuthService
     ) { }

  login(){

    this.auth.authenticate(this.creds)
    .subscribe(response => {
      //console.log(response.headers.get("Authorization"))
      this.auth.succesFulllogin(response.headers.get("Authorization"));
      this.nav.navigateForward('/categorias');
    },
    error => {console.log(error)}
    
    )
    }

 ionViewWillEnter() {
   this.menu.enable(false);
  }

ionViewDidLeave() {
  this.menu.enable(true);
}

  ngOnInit() {
  }

}
