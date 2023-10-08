import Checkout from "@/components/Checkout";
import PaymentStore from "@/lib/db";

const CourseIdPage = async ({ params }: { params: { paymentIntentId: string } }) => {
    const paymentIntentId = params.paymentIntentId;
    const paymentStore = PaymentStore.getInstance();
    const paymentIntent = await paymentStore.getPaymentIntent(paymentIntentId);

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
