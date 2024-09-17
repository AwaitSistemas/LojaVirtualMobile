import { PaymentPage } from './pagina/payment/payment.page';
import { CartService } from './../service/domain/cart-service';
import { StorageService } from './../service/storage.service';
import { ClienteService } from './../service/domain/cliente.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriaService } from 'src/service/domain/categoria.service';
import { AuthService } from 'src/service/auth.service';
import { ErrorInterceptorProvider } from 'src/interceptor/error-intercepto';
import { AuthInterceptorProvider } from 'src/interceptor/auth-interceptor';
import { ProdutoService } from 'src/service/domain/produto.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PaymentPage],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [

    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
