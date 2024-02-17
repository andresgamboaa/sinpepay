import { type Data } from "./Content"

interface Props {
    data: Data
}

const formatter = new Intl.NumberFormat('es-CR', {
  style: 'currency',
  currency: 'CRC',
  minimumFractionDigits:  2
});

function formatPhoneNumber(phoneNumber: number) {
    // Remove all non-digit characters
    var cleaned = ('' + phoneNumber).replace(/\D/g, '');
    // Add spaces after every two digits
    var formatted = cleaned.replace(/(\d{2})/g, '$1 ').trim();
    return formatted;
}

export default function PayDetails({data}:Props) {

    return (
        <div class=" flex flex-col gap-4 justify-center items-center my-4">
            <div class="flex flex-col justify-center items-center opacity-90 font-bold">
                <p class="text-sm ">Destino</p>
                <p class="text-lg">{formatPhoneNumber(data.receiver)}</p>
            </div>
            <p class="text-2xl font-bold">{data.detail}</p>
            <p class="text-4xl font-extrabold text-black">{formatter.format(data.amount)}</p>
        </div>
    )
}
