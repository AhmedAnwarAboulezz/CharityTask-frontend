import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { iif } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { Product, ProductItem } from '../models/resultCode';
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
  @ViewChild('StoreToolbarComponent', { static: true }) StoreToolbarComponent: any;

  constructor(
    private translateService: TranslationService,
    private localStorage: StorageService,
    private changeRef: ChangeDetectorRef,
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

  getProducts(){
    this.service.getProducts().subscribe(res=>{
      console.log("Products: ", res);
      let result =  this.getItemsQunatity(res);
      this.products = result;
      this.allProducts = this.products;
      this.resetCount();   
      
    });
    // this.service.getCardsPaged().subscribe(res=>{
    //   console.log("ANWAR CARDS: ", res);
    //   let result = res.data;
    //   result =  this.getItemsQunatity(result);
    //   this.products = result;
    //   this.allProducts = this.products;
    //   this.resetCount();      
    // });
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
    //this.changeRef.detectChanges();
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
        proditem.quantity = proditem.quantity !== undefined ? proditem.quantity + type : 0;
        let test = this.cartItems.find(a=>a.id == proditem.id);
        if(test !== undefined && test.quantity !== undefined){ 
          test.quantity = test.quantity + type;
          if(test.quantity <= 0) this.cartItems = this.cartItems.filter(a=>a.id !== proditem.id);
        }
        if(type == 1|| type == 0) this.alertService.info("Item added to cart");
        else if(type == -1) this.alertService.warning("Item removed from cart");
      }
      this.resetCount();
      this.localStorage.setObjectHash('cart-prod', this.cartItems);
    }
 
  }
  filterProducts(name: string){
    if(name !== undefined && name !== ''){
      if(this.lang === 'en'){
        this.products = this.allProducts.filter(a=>a.nameFl?.toLowerCase().includes(name) || a.price?.toString().includes(name));
      }
      else{
        this.products = this.allProducts.filter(a=>a.nameSl?.includes(name) || a.price?.toString().includes(name));
      }
    } 
    else this.products = this.allProducts;
  }

}
