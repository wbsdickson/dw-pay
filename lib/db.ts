import { v4 as uuidv4 } from "uuid";
import { Checkout, PaymentIntent, Store } from "./types";

class PaymentStore {
    private static instance: PaymentStore;
    private data: Store = {};

    private constructor() {}

    public static getInstance(): PaymentStore {
        if (!PaymentStore.instance) {
            console.log("construction new instance");
            PaymentStore.instance = new PaymentStore();
        }
        return PaymentStore.instance;
    }

    public async getAllData(): Promise<Store> {
        return this.data;
    }

    public async getPaymentIntent(id: string): Promise<PaymentIntent | null> {
        return this.data[id] || null;
    }

    public async updateSpecificData(id: string, updatedCheckout: PaymentIntent): Promise<void> {
        this.data[id] = {
            ...updatedCheckout,
            transactionTS: new Date(),
        };
    }

    public async createPaymentIntent(checkout: Checkout): Promise<string> {
        const id = uuidv4();
        this.data[id] = {
            status: "pending",
            transactionTS: null,
            cardHolderName: "",
            cardNumber: "",
            cvc: "",
            expiryMonth: "",
            expiryYear: "",
            ...checkout,
        };
        return id;
    }

    public async deleteAllData(): Promise<void> {
        this.data = {};
    }

    public async deleteSpecificData(id: string): Promise<void> {
        delete this.data[id];
    }
}

// Export a single instance of PaymentStore
export const paymentStore = PaymentStore.getInstance();
