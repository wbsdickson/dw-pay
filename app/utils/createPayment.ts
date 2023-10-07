// utils/createPayment.ts

interface PaymentInfo {
    amount: number;
    currency: string;
    // ... other fields
}

export function createPayment(paymentInfo: PaymentInfo): void {
    // Your payment logic here
    console.log("Processing payment for:", paymentInfo);
}
