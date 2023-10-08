import { PaymentIntent } from "@/lib/types";
import { paymentStore } from "@/lib/db";
import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/config/nomailer";
import axios from "axios";

type CheckoutRequest = PaymentIntent & {
    paymentIntentId: string;
};
export async function POST(req: Request) {
    try {
        let data: CheckoutRequest = await req.json();
        if (Object.keys(data).length == 0) {
            throw new Error("invalid data");
        }
        await paymentStore.updateSpecificData(data.paymentIntentId, {
            ...data,
            status: "settled",
        });
        await transporter.sendMail({
            from: "cs@dw-pay.com",
            to: data.from.email,
            subject: `Payment completed for ${data.items[0].name}`,
            text: `Thank you for your purchse for ${data.items[0].name}`,
            html: `
            
             <divHi, ${data.from.name},</div>
            <div>Thank you for your purchase for ${data.items[0].name}</div>
            <div>We have successfully received your payment.</div>
            `,
        });

        await axios.post(data.webhook, {
            courseId: data.items[0].id,
            userId: data.from.id,
            eventType: "checkout.session.completed",
        });
        const { successURL } = data;

        const existingUrlString = successURL;

        // Parse the existing URL string into a URL object
        const existingUrl = new URL(existingUrlString);

        // Add the new query parameter
        existingUrl.searchParams.set("courseId", data.items[0].id);

        // Convert the URL object back to a string
        const modifiedUrlString = existingUrl.toString();

        console.log(modifiedUrlString);
        return NextResponse.json({
            url: modifiedUrlString,
        });
    } catch (error) {
        console.error("[CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
