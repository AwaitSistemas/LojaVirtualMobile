import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { CidadeDTO } from 'src/models/cidade.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeService } from 'src/service/domain/cidade.service';
import { ClienteService } from 'src/service/domain/cliente.service';
import { EstadoService } from 'src/service/domain/estado.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[]; 

  constructor(
      private formBuilder: FormBuilder,
      public cidadeService: CidadeService,
      public estadoService: EstadoService,
      public clienteService: ClienteService,
      public alertCtrl: AlertController,
      public navController: NavController) { }

      signupUser(){
        
        this.clienteService.insert(this.form.value)
        .subscribe(response =>{
          this.showInsertOK();
        },
        error =>{

        });
      }

      async showInsertOK(){
        let alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: 'Sucesso',
          subHeader: 'Cadastro',
          message: 'Cadastro efetuado com sucesso.',
          backdropDismiss: false,
          buttons: [
                     {
                        text:'OK',
                        handler:() =>{
                          this.navController.pop();
                        }
                     }
                   ]
        });
         alert.present();
    
      }


  ngOnInit() {
        this.form = this.formBuilder.group ({
          nome: new FormControl('ABMAEL DE LIMA FERREIRA', [Validators.minLength(20), Validators.required, Validators.minLength(5)]),
          email: new FormControl('abmael100@gmail.com',[Validators.required, Validators.email]),
          tipo: new FormControl('1',[Validators.required]),
          cpfOuCnpj: new FormControl('01203855389',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
          senha: new FormControl('123',[Validators.required]),
          logradouro: new FormControl('Rua via',[Validators.required]),
          numero:new FormControl('35',[Validators.required]),
          complemento: new FormControl('Apt 3',[]),
          bairro: new FormControl('Copacabana',[]),
          cep: new FormControl('78120460',[Validators.required]),
          telefone1: new FormControl('65992250724',[Validators.required]),
          telefone2:new FormControl(''),
          telefone3:new FormControl(''),
          estadoId: new FormControl( [Validators.required]),
          cidadeId:new FormControl([Validators.required])
      });

      this.estadoService.findAll()
      .subscribe(response => {  
        this.estados = response;
        this.form.controls.estadoId.setValue(this.estados[0].id);
           if (this.estados[0].id) {
                this.updateCidades();
            }
      },
    error => { });
  }

  updateCidades() {

    let estado_id = this.form.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(
      response => {
        this.cidades = response;
        this.form.controls.cidadeId.setValue(null);
      },
    
      error => {}
    );
  }

}
