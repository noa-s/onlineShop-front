export interface RegisteredUser {
  id: string;
  pass: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
}

export interface LoginUser {
  id: string;
  pass: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
}
