import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pagina/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pagina/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pagina/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pagina/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pagina/produto/produto.module').then( m => m.ProdutoPageModule)
  },
  {
    path: 'produto-detail',
    loadChildren: () => import('./pagina/produto-detail/produto-detail.module').then( m => m.ProdutoDetailPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pagina/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'pick-address',
    loadChildren: () => import('./pagina/pick-address/pick-address.module').then( m => m.PickAddressPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
