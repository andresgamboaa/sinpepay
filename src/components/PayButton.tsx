import type { Data } from "./Content"

interface Props {
    number: number,
    data: Data
    redirect?: string
}

export default function PayButton({number, data, redirect}: Props) {
    const onPayButtonClicked = () => {
        if (redirect) {
            setTimeout(() => window.location.href = redirect, 2000)
        }
    }

    return (
        <div id="pay-button-container" class="flex flex-col justify-center items-center gap-2 ">
            <a onClick={onPayButtonClicked} id="pay-button" href={`sms:+506${number}?body=PASE ${data.amount} ${data.receiver} ${data.detail.replace(" ", "%20")}`} class="bg-orange-700 transition-all hover:bg-orange-600 p-2 px-12 text-white rounded-md font-bold text-2xl cursor-pointer mt-8">Pagar</a>
            <p>* Transferencia via sms.</p>
        </div>
    )
}

