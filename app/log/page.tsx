import { getAllData } from "@/lib/store-service";
import JSONView from "./_components/json-view";

export default async function Home() {
    let allPayment = await getAllData();
    console.log("home page list");
    console.table(allPayment);
    return <JSONView data={allPayment}></JSONView>;
}
