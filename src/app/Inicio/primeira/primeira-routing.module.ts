import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimeiraPage } from './primeira.page';

const routes: Routes = [
  {
    path: '',
    component: PrimeiraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimeiraPageRoutingModule {}
