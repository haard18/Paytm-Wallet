"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { OnRampTransactions } from "./OnRamptransactions";
import { createOnramp } from "../app/lib/actions/onRamp";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const[amount,setAmount]=useState("0");
    const[provider,setProvider]=useState("");
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            // console.log("Amount changed")
            setAmount(value)
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setProvider(value);
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            {/* <Button onClick={() => {
                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button> */}
            <button onClick={async()=>{
                await createOnramp({amount:amount,provider})
                // window.location.href=redirectUrl||"";
            }}>
                Add Money
            </button>
        </div>
    </div>
</Card>
}