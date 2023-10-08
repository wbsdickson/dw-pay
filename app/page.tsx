import { paymentStore } from "@/lib/db";

export default async function Home() {
    let allPayment = paymentStore.getAllData();
    console.log("home page list");
    console.table(allPayment);
    return (
        <>
            current payments
            {JSON.stringify(allPayment)}
        </>
    );
}
