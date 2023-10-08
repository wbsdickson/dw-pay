"use client";
import { JsonView } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
export default function JSONView({ data }: any) {
    return (
        <>
            <h1>DW Pay transaction log</h1>
            <h2>Total Transaction : {data.data.length}</h2>
            <JsonView data={data} />
        </>
    );
}
