import { type Data } from "./Content"

interface Props {
    data: Data
}

export default function PayDetails({data}:Props) {

    return (
        <div class=" flex flex-col gap-4 justify-center items-center my-4">
            <div class="flex flex-col justify-center items-center opacity-90 font-bold">
                <p class="text-sm ">Destino</p>
                <p class="text-lg">{data.receiver}</p>
            </div>
            <p class="text-2xl font-bold">{data.detail}</p>
            <p class="text-4xl font-extrabold text-black">₡{data.amount}</p>
        </div>
    )
}
