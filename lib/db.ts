import jsonfile from "jsonfile";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Checkout, PaymentIntent, Store } from "./types";

const FILE_PATH = path.join(process.cwd(), "lib", "payment-store.json");

class PaymentStore {
    private static instance: PaymentStore;
    private data: Store = {};

    private constructor() {}

    public static getInstance(): PaymentStore {
        if (!PaymentStore.instance) {
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
        await this.saveDataToFile();
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
        await this.saveDataToFile();
        return id;
    }

    public async deleteAllData(): Promise<void> {
        this.data = {};
        await this.saveDataToFile();
    }

    public async deleteSpecificData(id: string): Promise<void> {
        delete this.data[id];
        await this.saveDataToFile();
    }

    private async saveDataToFile(): Promise<void> {
        await jsonfile.writeFile(FILE_PATH, this.data, { spaces: 4 });
    }
}

export default PaymentStore;
