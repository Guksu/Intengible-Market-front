export interface Product {
  name: string;
  volume: number;
  nowVolume: number;
}

export interface UserProductList {
  ok: string;
  error?: string;
  product?: Product[];
}

export interface ProductListIF {
  userProductList: UserProductList;
}

export interface PurchaeProduct {
  name: string;
  volume: string;
}

export interface UserPurchaseProductList {
  ok: string;
  error?: string;
  purchaseProduct: PurchaeProduct[];
}

export interface PurchaseList {
  userPurchaseProductList: UserPurchaseProductList;
}
