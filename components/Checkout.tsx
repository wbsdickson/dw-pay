// components/CheckoutComponent.tsx
"use client";
import { useState } from "react";
import { PaymentIntent } from "../lib/types";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = PaymentIntent & {
    paymentIntentId: string;
};

const formSchema = z.object({
    cardholderName: z.string().min(3, {
        message: "Card holder name should be at least 3 characters",
    }),
    cardNumber: z.string().refine((i) => i.length === 16, {
        message: "Card number must be 16 digits",
    }),
    expiryMonth: z.string().min(1, {
        message: "Expiry month is required",
    }),
    expiryYear: z.string().min(1, {
        message: "Expiry month is required",
    }),
    cvc: z.string().refine((i) => i.length === 3, {
        message: "Card number must be 3 digits",
    }),
});
const Checkout = (props: Props) => {
    const { items, taxRate } = props;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "all",
    });
    const { isSubmitting, isValid, errors } = form.formState;

    const handlePay = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        let data = await axios.post("/api/checkout", {
            ...props,
            ...values,
        });
        window.location = data.data.url;
    };
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 20 }, (_, i) => i + 1);
    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const taxAmount = (taxRate * subtotal).toFixed(2);
    const totalAmount = Number(subtotal) + Number(taxAmount);

    if (!items) return <>Error</>;
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePay)} className="space-y-4 mt-4">
                <div className="min-w-screen min-h-screen bg-gray-50">
                    <div className="h-screen w-full bg-white  px-5 py-10 text-gray-800 -mx-3 md:flex items-center justify-center gap-10">
                        <div className="px-3 md:w-4/12 lg:pr-10">
                            <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="flex gap-6 mb-20">
                                    <ShoppingBag />
                                    <div className="font-semibold uppercase text-gray-600">{props.to}</div>
                                </div>
                                <div className="w-full flex items-center">
                                    <img className="w-16 h-16 rounded-sm" src={props.items[0].img + ""} alt="" />
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-semibold uppercase text-gray-600">{items[0].name}</h6>
                                        <p className="text-gray-400">x {items[0].quantity}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600 text-xl">${items[0].price}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="-mx-2 flex items-end justify-end">
                                    <div className="flex-grow px-2 lg:max-w-xs">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                                            Discount code
                                        </label>
                                        <div>
                                            <input
                                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                                placeholder="XXXXXX"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <button
                                            type="button"
                                            className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                                        >
                                            APPLY
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Subtotal</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">${subtotal}</span>
                                    </div>
                                </div>
                                {taxRate && (
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Taxes (GST)</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold">${taxAmount}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold text-gray-400 text-sm">USD</span>{" "}
                                        <span className="font-semibold">${totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 md:w-4/12">
                            <div className="w-full mx-auto rounded-lg bg-white p-3 text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="w-32">
                                        <span className="text-gray-600 font-semibold">Contact</span>
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <span>{props.from.name}</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="w-32">
                                        <span className="text-gray-600 font-semibold">Email</span>
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <span>{props.from.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mx-auto rounded-lg bg-white  text-gray-800 font-light mb-6">
                                <div className="w-full p-3 border-b border-gray-200">
                                    <div className="mb-5">
                                        <label htmlFor="type1" className="flex items-center cursor-pointer">
                                            <RadioGroup defaultValue="option-one">
                                                <RadioGroupItem value="option-one" id="option-one" />
                                            </RadioGroup>
                                            <img
                                                src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                                                className="h-6 ml-3"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <div className="mb-3">
                                            <FormField
                                                control={form.control}
                                                name="cardholderName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                                                            CardholderName
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input disabled={isSubmitting} {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <FormField
                                                control={form.control}
                                                name="cardNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                                                            Card Information
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                maxLength={16}
                                                                placeholder="#### #### #### ####"
                                                                disabled={isSubmitting}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="mb-3 mt-3 -mx-2 flex">
                                                <div className="px-2 w-1/3">
                                                    <div>
                                                        <FormField
                                                            control={form.control}
                                                            name="expiryMonth"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <Select
                                                                        onValueChange={field.onChange}
                                                                        defaultValue={field.value}
                                                                    >
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="MM" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <ScrollArea className="h-40 w-48 rounded-md border">
                                                                                {months.map((month) => (
                                                                                    <SelectItem
                                                                                        key={month}
                                                                                        value={String(month)}
                                                                                    >
                                                                                        {month}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </ScrollArea>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="px-2 w-1/3">
                                                    <FormField
                                                        control={form.control}
                                                        name="expiryYear"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="YYYY" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <ScrollArea className="h-40 w-48 rounded-md border">
                                                                            {years.map((month) => (
                                                                                <SelectItem
                                                                                    key={month + 2022}
                                                                                    value={String(month + 2022)}
                                                                                >
                                                                                    {month + 2022}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </ScrollArea>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="px-2 w-1/3">
                                                    <div>
                                                        <FormField
                                                            control={form.control}
                                                            name="cvc"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input
                                                                            maxLength={3}
                                                                            placeholder="###"
                                                                            disabled={isSubmitting}
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full p-3">
                                    <label htmlFor="type2" className="flex items-center cursor-pointer">
                                        <RadioGroup defaultValue="option-one">
                                            <RadioGroupItem disabled value="paypal" id="paypal" />
                                        </RadioGroup>
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                            width="80"
                                            className="ml-3"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    className="w-full font-semibold"
                                    type="submit"
                                    variant="default"
                                >
                                    <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};
export default Checkout;
