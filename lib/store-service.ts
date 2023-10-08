import { v4 as uuidv4 } from "uuid";
import { Store } from "./types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllData = async (): Promise<any> => {
    return prisma.store.findMany();
};

export const getPaymentIntent = async (id: string): Promise<any | null> => {
    console.log("graping for id", id);
    return prisma.store.findUnique({
        where: { id },
    });
};

export const updateSpecificData = async (id: string, updatedCheckout: any): Promise<void> => {
    await prisma.store.update({
        where: { id },
        data: {
            data: updatedCheckout,
        },
    });
};

export const createPaymentIntent = async (checkout: any): Promise<string> => {
    const id = uuidv4(); // Generates a unique ID for the checkout
    await prisma.store.create({
        data: {
            id,
            data: {
                status: "pending",
                transactionTS: null,
                cardHolderName: "",
                cardNumber: "",
                cvc: "",
                expiryMonth: "",
                expiryYear: "",
                ...checkout,
            },
        },
    });
    return id; // Returning the generated ID for reference
};

export const deleteAllData = async (): Promise<void> => {
    await prisma.store.deleteMany({});
};

export const deleteSpecificData = async (id: string): Promise<void> => {
    await prisma.store.delete({
        where: { id },
    });
};
