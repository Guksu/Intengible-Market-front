import { CommonOutput } from "./CommonIF";

export interface LoginOutput extends CommonOutput {
  token?: string;
}

export interface LoginMutation {
  login: LoginOutput;
}
