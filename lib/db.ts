import jsonfile from "jsonfile";
import { v4 as uuidv4 } from "uuid";
import { Checkout, PaymentIntent, Store } from "./types";
import path from "path";

const FILE_PATH = path.join("./payment-store.json");

export const getAllData = async (): Promise<Store> => {
    return jsonfile.readFile(FILE_PATH);
};

export const getPaymentIntent = async (id: string): Promise<PaymentIntent | null> => {
    const data: Store = await jsonfile.readFile(FILE_PATH);
    return data[id] || null;
};

export const updateSpecificData = async (id: string, updatedCheckout: PaymentIntent): Promise<void> => {
    const data: Store = await jsonfile.readFile(FILE_PATH);
    data[id] = {
        ...updatedCheckout,
        transactionTS: new Date(),
    };
    return jsonfile.writeFile(FILE_PATH, data, { spaces: 4 });
};

export const createPaymentIntent = async (checkout: Checkout): Promise<string> => {
    const data: Store = await jsonfile.readFile(FILE_PATH);
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
    await jsonfile.writeFile(FILE_PATH, data, { spaces: 2 });
    return id; // Returning the generated ID for reference
};

export const deleteAllData = async (): Promise<void> => {
    return jsonfile.writeFile(FILE_PATH, {}); // Writes an empty object to clear all data
};

export const deleteSpecificData = async (id: string): Promise<void> => {
    const data: Store = await jsonfile.readFile(FILE_PATH);
    delete data[id];
    return jsonfile.writeFile(FILE_PATH, data);
};
