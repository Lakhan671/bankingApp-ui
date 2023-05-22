export interface Transaction {
    transactionId: string;
    crNo: string;
    desc: string;
    deposit: number;
    withdraw: number;
    currentBalance: number;
    trDate: Date;
    customerId: string;
  
  }
  