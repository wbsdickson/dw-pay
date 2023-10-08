import Checkout from "@/components/Checkout";
import { getPaymentIntent } from "@/lib/db";

const CourseIdPage = async ({ params }: { params: { paymentIntentId: string } }) => {
    const paymentIntentId = params.paymentIntentId;
    const paymentIntent = await getPaymentIntent(paymentIntentId);

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
