
export class ResultCode{
    code?:string;
    description?:string;  
}

export class ProductItem{
  id?:string;
  code?:string;
  nameFl?:string;
  nameSl?:string;
  createdDate?:Date;
  price?:number;
  productTypeId?:number;
  amountInStock?:number;
  remainInStock?:number;
  quantity?:number;
}

export class Order{
  id?:string;
  //products?: ProductItem[];
  phoneNumber?: string;
  totalPrice?: number;
  totalPayment?:number;
  change?:number;
  orderDetails?:OrderDetail[];
}
export class OrderDetail{
  orderId?: string;
  amount?: number;
  productId?:string;
}
