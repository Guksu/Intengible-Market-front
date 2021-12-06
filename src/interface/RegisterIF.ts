export interface CreateAccountOutput {
  ok: boolean;
  error?: string;
}

export interface CreateAccount {
  createAccount: CreateAccountOutput;
}
