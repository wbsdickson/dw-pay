"use client";
import { JsonView } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
export default function JSONView({ data }: any) {
    return <JsonView data={data} />;
}
