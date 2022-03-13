import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreRoutingModule } from './store-routing.module';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { CardLoginComponent } from './pages/card-login/card-login.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';




@NgModule({
  declarations: [
    ProductsComponent,
    MyCartComponent,
    CardLoginComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreRoutingModule
  ],
  entryComponents:[]
})
export class StoreModule { }
