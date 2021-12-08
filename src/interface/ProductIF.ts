import { CommonOutput } from "./CommonIF";

export interface AllProduct {
  name: string;
  img: string;
  price: number;
  description: string;
  nowVolume: number;
}

export interface GetProductOutput extends CommonOutput {
  product?: AllProduct[];
}

export interface GetProductIF {
  getProduct: GetProductOutput;
}
