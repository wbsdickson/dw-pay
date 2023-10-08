export type CheckoutItem = {
    name: string;
    quantity: number;
    price: number;
    img?: string;
    id: string;
};
export type User = {
    name: string;
    email: string;
    id: string;
};
export type Checkout = {
    items: Array<CheckoutItem>;
    to: string;
    from: User;
    successURL: string;
    failURL: string;
    taxRate: number;
    webhook: string;
};
export type PaymentIntent = Checkout & {
    status: string;
    transactionTS: Date | null;
    cardHolderName: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
};
export type Store = {
    [key: string]: PaymentIntent;
};
