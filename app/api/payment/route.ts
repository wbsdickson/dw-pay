import { Checkout } from "@/lib/types";
import { createPaymentIntent } from "@/lib/store-service";
import { env } from "@/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        let data: Checkout = await req.json();
        console.log("Receive payment call, ", data);
        let paymentIntentId = await createPaymentIntent(data);
        return NextResponse.json({
            url: `${env.NEXT_PUBLIC_APP_URL}/checkout/${paymentIntentId}`,
        });
    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
