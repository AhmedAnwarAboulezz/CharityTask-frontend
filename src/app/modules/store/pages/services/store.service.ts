import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpService: HttpService) { }

  AddCheckout(sendToObj:any){
    return this.httpService.postData('Orders/AddCheckout', sendToObj)
    
  }
  getProducts(productTypeId:any) {
    return this.httpService.getData(`Products/GetAllByProductType/${productTypeId}`);
  }
}
