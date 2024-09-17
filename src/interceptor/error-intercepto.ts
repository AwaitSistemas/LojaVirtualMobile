import { StorageService } from './../service/storage.service';


import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { Observable} from 'rxjs/internal/observable/throwError';
//import {  Observable} from "rxjs/Rx";
import { AlertController, NavController } from '@ionic/angular';
import { throwError } from 'rxjs/internal/observable/throwError';
import { FieldMessage } from 'src/models/fieldmessage';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(
        public storage: StorageService,
        public alertController: AlertController
        ){}

        handleError(error: HttpErrorResponse){
            let  errorObj = error.error;
                  
            console.log(errorObj);
            return throwError(errorObj);
        }
    
    // Esse metodo esta funcionando porem, na primeira vez não, somente na segunda tentativa, o redicionamento ocorre
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //const authToken = this.auth.authenticate;
        //console.log(authToken);
           
           return next.handle(req)        
               .pipe(
                   catchError((error, catchError) => {
   
                       let errorObj = error;
                       if(errorObj.error){
                           errorObj = errorObj.error;
                       }
                       if(!errorObj.status) {
                           errorObj = JSON.parse(errorObj);
                       }
                               console.log("Error detectado pelo interceptor");
                               console.error(errorObj);

                        switch(errorObj.status){
                            case 401:
                                this.handler401()   ;
                                break;

                            case 403:
                                this.handler403();
                                break;

                            case 422:
                                this.handler422(errorObj);
                                break;

                                default:
                                    this.handlerDefaultError(errorObj);
                                    
                        }
                      return this.handleError(errorObj); //retornar o metodo handleErro criado pois ele é um obsevable
                     
                   })
               ) as any;
           }

           async handlerDefaultError(errorObj){
                const alert = await this.alertController.create({

                    cssClass: 'my-custom-class',
                    header: 'Erro '+ errorObj.status + ':' + errorObj.error,
                    subHeader: 'Error',
                    message: errorObj.message,
                    backdropDismiss: false,
                    buttons: [
                                {text:'OK'}
                            ]

                });

                    alert.present();
          }

           async handler401(){ 
               const alert = await this.alertController.create({

                    cssClass: 'my-custom-class',
                    header: 'Erro 401: Falha de autenticação',
                    subHeader: 'Error',
                    message: 'Email ou senha incorretos.',
                    backdropDismiss: false,
                    buttons: [
                                {text:'OK'}
                            ]

                });
                    alert.present();
            }

           handler403(){ 
                this.storage.setLocalUser(null);
           }

           async handler422(errorObj){

            const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Erro 422: Error de validação',
                subHeader: 'Error 422',
                message: this.listErrors(errorObj.errors),
                backdropDismiss: false,
                buttons: [
                           {text:'OK'}
                         ]
            });
     
                 alert.present();

            }

           private listErrors(messages : FieldMessage[]): string {
            let s: string = '';
            for(var i=0; i<messages.length;i++){
                s =s+ '<p><strong>'+ messages[i].nome + "</strong>: "+ messages[i].message + '</p>'
            }
            return s;
        }
           
        }



export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};


