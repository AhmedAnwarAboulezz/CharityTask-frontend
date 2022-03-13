import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardLoginComponent } from './pages/card-login/card-login.component';
import { ProductsComponent } from './pages/products/products.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'my-cart',
    component: MyCartComponent
  },
  {
    path: 'card-login',
    component: CardLoginComponent    
  },
  {
    path:'terms-conditions',
    component:TermsConditionsComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
