import { getAllData } from "@/lib/store-service";

export default async function Home() {
    let allPayment = await getAllData();
    console.log("home page list");
    console.table(allPayment);
    return <pre>{JSON.stringify(allPayment, null, 2)}</pre>;
}
