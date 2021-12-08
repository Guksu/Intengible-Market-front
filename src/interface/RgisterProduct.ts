import { CommonOutput } from "./CommonIF";

export interface RegisterProductOutput extends CommonOutput {}

export interface RegisterProductIF {
  registerProduct: RegisterProductOutput;
}
