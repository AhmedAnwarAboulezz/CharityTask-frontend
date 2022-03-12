import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreRoutingModule } from './store-routing.module';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { TransactionResultComponent } from './pages/transaction-result/transaction-result.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { CardLoginComponent } from './pages/card-login/card-login.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';




@NgModule({
  declarations: [
    ProductsComponent,
    MyCartComponent,
    CheckoutComponent,
    TransactionResultComponent,
    MyOrdersComponent,
    CardLoginComponent,
    OrderDetailsComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreRoutingModule
  ],
  entryComponents:[MyOrdersComponent]
})
export class StoreModule { }
