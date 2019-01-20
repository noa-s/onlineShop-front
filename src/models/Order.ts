export interface Order {
  id: string;
  userId: string;
  cartId: string;
  orderDate: Date;
  creditCard: string;
  city: string;
  street: string;
  dateToDeliever: Date;
  finalPrice: number;
  status: string;
}
