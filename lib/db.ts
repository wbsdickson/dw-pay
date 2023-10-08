import { v4 as uuidv4 } from "uuid";
import { Checkout, PaymentIntent, Store } from "./types";

// Create an in-memory object to store data
const data: Store = {};

export const getAllData = async (): Promise<Store> => {
    return data;
};

export const getPaymentIntent = async (id: string): Promise<PaymentIntent | null> => {
    return data[id] || null;
};

export const updateSpecificData = async (id: string, updatedCheckout: PaymentIntent): Promise<void> => {
    data[id] = {
        ...updatedCheckout,
        transactionTS: new Date(),
    };
};

export const createPaymentIntent = async (checkout: Checkout): Promise<string> => {
    const id = uuidv4(); // Generates a unique ID for the checkout
    data[id] = {
        status: "pending",
        transactionTS: null,
        cardHolderName: "",
        cardNumber: "",
        cvc: "",
        expiryMonth: "",
        expiryYear: "",
        ...checkout,
    };
    return id; // Returning the generated ID for reference
};

export const deleteAllData = async (): Promise<void> => {
    Object.keys(data).forEach((key) => {
        delete data[key];
    });
};

export const deleteSpecificData = async (id: string): Promise<void> => {
    delete data[id];
};
