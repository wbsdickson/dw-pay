"use client";
import { JsonView } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
export default function JSONView({ data }: any) {
    return (
        <div className="p-4">
            <b>DW Pay transaction log</b>
            {data && data.length > 0 && (
                <>
                    <p>Total Transaction : {data.length}</p>
                    <JsonView data={data} />
                </>
            )}
        </div>
    );
}
