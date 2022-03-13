import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { Order, OrderDetail, PaymentOrder, Product, ProductItem } from '../models/resultCode';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  lang: any;
  cartItems: ProductItem[] = [];
  cartCount = 0;
  totalPrice = 0;
  acceptedTerms = false;
  OrderForm: FormGroup = new FormGroup({});

  constructor(
    private translateService: TranslationService,
    private localStorage: StorageService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,
    private changeRef: ChangeDetectorRef
  ) {
    this.OrderForm = this.fb.group({
      phoneNumber: ['', [Validators.minLength(8)]],
      totalPay: [null, [Validators.required,Validators.min(this.totalPrice)]],
      charge: [0, [Validators.required,Validators.min(0)]],
    });
   }


  ngOnInit(): void {
    this.cartItems = this.getCartStorage();
    this.checkEmptyCart();
    this.getTotalPrice();
    this.translateService.currentLanguage$.subscribe(lang => { this.lang = lang;  });
    this.resetCount();

  }
  getCartStorage(): any[]{
    let res = this.localStorage.getObjectHash('cart-prod');
    if(res == null) return [];
    return res;
  }
  resetCount(){
    this.cartCount = 0;
    this.cartItems.map(a=>a.quantity).forEach(quan => {
      if(quan !== undefined) this.cartCount = this.cartCount + quan;
    });
    //this.changeRef.detectChanges();
  }

  addToCart(proditem:any,type: number){
    if(proditem !== undefined){ 
      if(type == 2){
        this.cartItems = this.cartItems.filter(a=>a.id !== proditem.id);
      }
      else{
        proditem.quantity = proditem.quantity !== undefined ? proditem.quantity + type : 0;
        if(proditem.quantity <= 0) this.cartItems = this.cartItems.filter(a=>a.id !== proditem.id);
      }
      if(type == 1) this.alertService.info("Item added to cart");
      else if(type == -1 || type == 2) this.alertService.warning("Item removed from cart");
      this.resetCount();
      debugger;
      this.localStorage.setObjectHash('cart-prod', this.cartItems);
      this.checkEmptyCart();
      this.getTotalPrice();
    }
 
  }

  checkEmptyCart(){
    if(this.cartItems.length < 1) {
      this.alertService.warning('Sorry, Empty Cart!');
      this.router.navigate(['/store']);
    }
  }

  getTotalPrice(){
    this.totalPrice = 0;
    this.cartItems.forEach((item:ProductItem) => {
      this.totalPrice+= ((item.quantity ?? 0 )*(item.price ?? 0));
    });
    this.setCharge();
    this.OrderForm.controls['totalPay'].clearValidators();
    this.OrderForm.controls['totalPay'].setValidators([Validators.required,Validators.min(this.totalPrice)]);
  }

  getTotalCount(){
    return this.cartItems.length;
  }
  setCharge(){
    let charge:number = this.OrderForm.value.totalPay - this.totalPrice;
    this.OrderForm.controls['charge'].setValue(charge);
  }
  mapOrderDetails(products:ProductItem[]):OrderDetail[]{
   let res:OrderDetail[] = [];
   products.forEach(item => {
      res.push({
        productId: item.id,
        amount: item.quantity
      });
   });
   return res;
  }

  confirmPayment(){
    let result: Order = {
      phoneNumber: this.OrderForm.value.phoneNumber,
      products: this.cartItems,
      totalPrice: this.totalPrice,
      totalPayment: this.OrderForm.value.totalPay,
      change: this.OrderForm.value.change,
      orderDetails: this.mapOrderDetails(this.cartItems)
    }
    console.log("Result : ", result);
    //this.localStorage.setObjectHash('pay-prod', result);
    //this.router.navigate(['/store/checkout']);
  }
}


