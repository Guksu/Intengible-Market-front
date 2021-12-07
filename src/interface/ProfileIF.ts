import { CommonOutput } from "./CommonIF";

export interface Product {
  name: string;
  volume: number;
  nowVolume: number;
}

export interface UserProductListOutput extends CommonOutput {
  product?: Product[];
}

export interface ProductListIF {
  userProductList: UserProductListOutput;
}

export interface PurchaeProduct {
  name: string;
  volume: number;
}

export interface UserPurchaseProductListOutput extends CommonOutput {
  purchaseProduct: PurchaeProduct[];
}

export interface PurchaseList {
  userPurchaseProductList: UserPurchaseProductListOutput;
}
