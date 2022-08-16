export interface SignUpFormState {
  email: string;
  password: string;
}

export interface SignInFormState {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}
