export interface Token {
  name: string;
  id: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}
export interface Login {
  email: string;
  password: string;
}
export interface CreateCompany {
  bank: string;
  name: string;
  email: string;
  phone: string;
  yt: string;
  twt: string;
  fb: string;
  desc: string;
  location: string;
  user: string;
  bankBal: number;
  cashBal: number;
}

export interface Transaction {
  id: string;
  amount: number;
  name: string;
  cash: number;
  bank: number;
}
