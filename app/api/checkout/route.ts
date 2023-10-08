import { PaymentIntent } from "@/lib/types";
import { updateSpecificData } from "@/lib/db";
import { NextResponse } from "next/server";

type CheckoutRequest = PaymentIntent & {
    paymentIntentId: string;
};
export async function POST(req: Request) {
    try {
        let data: CheckoutRequest = await req.json();
        if (Object.keys(data).length == 0) {
            throw new Error("invalid data");
        }
        await updateSpecificData(data.paymentIntentId, {
            ...data,
            status: "settled",
        });
        const { successURL } = data;
        return NextResponse.json({
            url: successURL,
        });
    } catch (error) {
        console.error("[CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
