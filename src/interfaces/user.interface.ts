export interface RegisterUser {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
