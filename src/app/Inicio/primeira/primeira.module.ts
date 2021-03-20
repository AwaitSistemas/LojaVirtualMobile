import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimeiraPageRoutingModule } from './primeira-routing.module';

import { PrimeiraPage } from './primeira.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimeiraPageRoutingModule
  ],
  declarations: [PrimeiraPage]
})
export class PrimeiraPageModule {}
