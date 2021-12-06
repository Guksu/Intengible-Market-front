export interface LoginOutput {
  ok: string;
  error?: string;
  token: string;
}

export interface LoginMutation {
  login: LoginOutput;
}
