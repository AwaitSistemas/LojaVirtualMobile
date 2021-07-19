import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidoDTO } from './../../../models/pedido.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router

  ) {
    this.pedido = JSON.parse(this.activateRoute.snapshot.paramMap.get('pedido'));


    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [this.parcelas[9], Validators.required],
      "@type": ["pagamentoComCartao"]
    })

  }

  ngOnInit() {
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido);
  }


}
