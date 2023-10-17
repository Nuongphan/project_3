interface IProduct {
    bestsellers: number;
    id: string;
    name: string;
    price: number;
    description: string;
    type: string;
    image: string[];
    quantity: number;
    totalReview: number;
    feedback: string[];
    totalRating: number;
    status: boolean;
  }
  
  interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    phone: string;
    address: string;
    cart: [];
    discount: number;
    role: string;
    avatar: string;
    status: boolean;
    dob: string,
    member: string;
  }
  
  interface IOrder {
    id: string;
    idUser: string;
    status: string;
    address: string;
    phoneNumber: string;
    paymentMethod: string;
    detail: [];
    date: any;
    totalPrice: number;
    totalQuantity: number;
    shipping: string
  }
  export type { IProduct, IUser, IOrder } 