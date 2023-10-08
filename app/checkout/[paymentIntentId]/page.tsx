import Checkout from "@/components/Checkout";
import { getPaymentIntent } from "@/lib/store-service";

const CourseIdPage = async ({ params }: { params: { paymentIntentId: string } }) => {
    const paymentIntentId = params.paymentIntentId;
    const store = await getPaymentIntent(paymentIntentId);
    const paymentIntent = store.data;
    console.log("paymentIntent= ", paymentIntent);
    console.log("items= ", paymentIntent.items);

    if (!paymentIntent) {
        return "error in page";
    }
    return (
        <>
            <Checkout {...paymentIntent} paymentIntentId={paymentIntentId} />
        </>
    );
};

export default CourseIdPage;
