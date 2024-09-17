import { StorageService } from './storage.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/config/api.config";
import { tap } from 'rxjs/operators';
import { CredenciaisDTO } from "src/models/credenciais.dto";
import { LocalUser } from "src/models/local_user";
import { JwtHelperService  } from '@auth0/angular-jwt';
import { CartService } from './domain/cart-service';

@Injectable()
export class AuthService{

  jwtHelperService: JwtHelperService = new JwtHelperService();

    constructor(
      private http: HttpClient,
      public storage: StorageService,
      public cartService: CartService){
        
    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseURL}/login`,
            creds, 
            { observe: 'response',  responseType: 'text' }
        ).pipe(tap( res => {

          console.log(res)
          
          const token = res.headers.get('Authorization');

        }))
      }
    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseURL}/auth/refresh_token`,
            {}, 
            { observe: 'response',  responseType: 'text' }
        ).pipe(tap( res => {

          console.log(res)
          
          const token = res.headers.get('Authorization');

        }))
      }


      succesFulllogin(authorizationValue: string){
        let  tok = authorizationValue.substring(7);
        let user: LocalUser = {
          token: tok,
          email: this.jwtHelperService.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
 }

 logout(){
  this.storage.setLocalUser(null);
}


    }