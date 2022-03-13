import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import {  ProductItem } from '../models/resultCode';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  lang: any;
  products: ProductItem[] = [];
  allProducts: ProductItem[] = [];
  cartItems: ProductItem[] = [];
  cartCount = 0;
  productTypeId=1;
  @ViewChild('StoreToolbarComponent', { static: true }) StoreToolbarComponent: any;

  constructor(
    private translateService: TranslationService,
    private localStorage: StorageService,
    private service:StoreService,
    private alertService: AlertService
    ) { 
  }

  ngOnInit(): void {
    this.cartItems = this.getCartStorage();
    this.translateService.currentLanguage$.subscribe(lang => { this.lang = lang;  });
    this.getProducts();
  }
  getCartStorage(): any[]{
    let res = this.localStorage.getObjectHash('cart-prod');
    if(res == null) return [];
    return res;
  }
  changeProductType(event:any){
     this.productTypeId = event.value;
     this.getProducts();
  }

  getProducts(){
    this.service.getProducts(this.productTypeId).subscribe(res=>{
      console.log("Products: ", res);
      let result =  this.getItemsQunatity(res);
      this.products = result;
      this.allProducts = this.products;
      this.resetCount(); 
    },error => {
      this.alertService.error("an error happened");
    });
  }

  getItemsQunatity(products: any[]): any[]{
    this.cartItems.forEach(item => {
      let product = products.find(a=>a.id == item.id);
      if(product !== undefined) product.quantity = item.quantity;
    });
    return products;
  }

  resetCount(){
    this.cartCount = 0;
    this.cartItems.map(a=>a.quantity).forEach(quan => {
      if(quan !== undefined) this.cartCount = this.cartCount + quan;
    });
  }
  isInCart(item:any): boolean{
    return this.cartItems.map(a=>a.id).includes(item.id);
  }

  addToCart(proditem:ProductItem,type: number){
    if(proditem !== undefined){ 
      if(type == 0){
        proditem.quantity = 1;
        let newproditem: ProductItem = {
          id: proditem.id,
          code: proditem.code,
          createdDate: proditem.createdDate, 
          nameFl: proditem.nameFl,
          nameSl: proditem.nameSl, 
          price: proditem.price,
          productTypeId:proditem.productTypeId,
          amountInStock: proditem.amountInStock,
          remainInStock: proditem.remainInStock,
          quantity: proditem.quantity
        }
        this.cartItems.push(newproditem);
      }
      else{
        if(type == 1 && proditem.remainInStock !==undefined && proditem.quantity !== undefined && proditem.remainInStock <= (proditem.quantity)){
          this.alertService.error("You can't exceed amount available in stock");
          return;
        }
        proditem.quantity = proditem.quantity !== undefined ? proditem.quantity + type : 0;
        let test = this.cartItems.find(a=>a.id == proditem.id);
        if(test !== undefined && test.quantity !== undefined){ 
          test.quantity = test.quantity + type;
          if(test.quantity <= 0) this.cartItems = this.cartItems.filter(a=>a.id !== proditem.id);
        }
        //if(type == 1|| type == 0) this.alertService.info("Item added to cart");
        //else if(type == -1) this.alertService.warning("Item removed from cart");
      }
      this.resetCount();
      this.localStorage.setObjectHash('cart-prod', this.cartItems);
    }
 
  }
  filterProducts(name: string){
    if(name !== undefined && name !== ''){
      name = name.toLowerCase();
      if(this.lang === 'en'){
        this.products = this.allProducts.filter(a=>a.nameFl?.toLowerCase().includes(name) || a.code?.toLowerCase().includes(name) || a.price?.toString().includes(name));
      }
      else{
        this.products = this.allProducts.filter(a=>a.nameSl?.toLowerCase().includes(name) || a.code?.toLowerCase().includes(name) || a.price?.toString().includes(name));
      }
    } 
    else this.products = this.allProducts;
  }

  resetCart(){
    this.cartItems = [];
    this.localStorage.removeItemHash('cart-prod');
    this.getProducts();
  }

}
