import { useState, useEffect } from "preact/compat";
import { banks } from "../banks";

interface Props {
    onBankChanged?: (number:number) => void
}

export default function SelectBank({onBankChanged}: Props) {
    const [bankNumber, setBankNumber] = useState<number>(2627)

    useEffect(() => {
        const savedBankNumber = localStorage.getItem("bankNumber")

        if (savedBankNumber) {
            setBankNumber(parseInt(savedBankNumber))
        }
    }, [])


    useEffect(() => {
        localStorage.setItem("bankNumber", bankNumber.toString())
        if (onBankChanged) onBankChanged(bankNumber)
    }, [bankNumber])


    return (
        <div class="h-full flex justify-center gap-2 items-center">
            <select 
                onChange={(e) => {
                    setBankNumber(parseInt(e.currentTarget.value))
                }}
                value={bankNumber}
                name="bank" 
                class="text-orange-900 outline-none ring ring-transparent focus:ring-orange-700 font-semibold p-2 px-4 border border-orange-800 rounded-md"
            >
                {banks.map((bank) => <option key={bank.number} value={bank.number}>{ `${bank.name} (${bank.number})`}</option>)}
            </select>	
        </div>
    )
}
