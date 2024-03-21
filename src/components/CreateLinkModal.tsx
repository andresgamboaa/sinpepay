import { useState } from "preact/hooks"

interface Props {
    onClose: () => void
}

interface Data {
    receiver: number | undefined,
    receiverError: string | null,
    amount: number | undefined,
    amountError: string | null,
    detail: string,
    detailError: string | null,
    redirect: string | undefined
}


export default function CreateLinkModal({onClose}: Props) {
    const [data, setData] = useState<Data>({
        receiver: undefined,
        receiverError: null,
        amount: undefined,
        amountError: null,
        detail: "",
        detailError: null,
        redirect: undefined
    })

    const [link, setLink] = useState<string | undefined>()

    const [copyButtonText, setCopyButtonText] = useState("copiar")

    const handleSubmit = () => {
        const invalidDetalleRegex = /^[a-zA-Z0-9 ]{1,20}$/;
        let newData: Data = {...data, receiverError: null, amountError: null, detailError: null}
        if (!data.receiver) newData.receiverError = "Debe indicar el numero del destino."
        if (data.receiver?.toString().length !== 8) newData.receiverError = "Ingrese un numero valido."
        if (!data.amount) newData.amountError = "Debe indicar la cantidad de dinero."
        if (data.detail && !invalidDetalleRegex.test(data.detail)) newData.detailError = "El detalle no debe tener caracteres especiales y debe ser menor de 20 caracteres."

        setData(newData)
        setLink(undefined)
        if (!(newData.amountError || newData.receiverError || newData.detailError)) {
            const encodedData = encodeURIComponent(JSON.stringify([data.amount, data.receiver, data.detail]))
            setLink(`https://sinpepay.net/pago/?data=${encodedData}${data.redirect?`&redirect=${data.redirect}`: ""}`)
        }
    }

    return (
        <div class="absolute z-40 top-0 left-0 w-screen h-full bg-black/50 flex justify-center items-center overflow-hidden">
            <div class="w-full relative max-w-[400px] h-fit min-h-[200px] bg-white rounded-md border  flex flex-col p-4">
                <button 
                    onClick={onClose}
                    class="absolute top-2 right-4 text-2xl"
                >x</button>
                <h1 class="font-bold mb-4 text-lg">Crear enlace de pago</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }} class="flex flex-col">
                    <label for="receiver" class="">Numero de destino</label>
                    <input type="number" value={data.receiver??""} onChange={(e) => setData({...data, receiver: e.currentTarget.value?parseInt(e.currentTarget.value):undefined})} name="receiver" class={`border rounded-md p-2 ${data.receiverError?" outline outline-red-600":""}`}/>
                    {data.receiverError && <span class="text-xs text-red-600">{data.receiverError}</span>}
                    <label for="amount" class=" mt-4">Cantidad</label>
                    <input type="number" value={data.amount??""} onChange={(e) => setData({...data, amount: e.currentTarget.value?parseInt(e.currentTarget.value):undefined})} name="amount" class={`border rounded-md p-2 ${data.amountError?" outline outline-red-600":""}`}/>
                    {data.amountError && <span class="text-xs text-red-600">{data.amountError}</span>}
                    <label for="detail" class=" mt-4">Detalle</label>
                    <input type="text" value={data.detail??""} onChange={(e) => setData({...data, detail: e.currentTarget.value})} name="detail" class={`border rounded-md p-2 ${data.detailError?" outline outline-red-600":""}`}/>
                    {data.detailError && <span class="text-xs text-red-600">{data.detailError}</span>}
                    <label for="redirect" class=" mt-4">Redirigir (opcional)</label>
                    <input type="text" value={data.redirect??""} onChange={(e) => setData({...data, redirect: e.currentTarget.value})} name="redirigir" placeholder="https://misitioweb.com/orden/32" class="border rounded-md p-2"/>
                    <button type="submit" class="bg-orange-700 transition-all hover:bg-orange-600 p-2 px-12 text-white rounded-md font-bold text-lg cursor-pointer outline-none mt-4">Crear</button>
                </form>
                {link && 
                    <div class="w-full flex items-center mt-4 gap-2">
                        <input type="text" class="w-full p-2 rounded-md border" readOnly value={link}/>
                        <button onClick={() => {
                            navigator.clipboard.writeText(link)
                            setCopyButtonText("copiado!")
                            setTimeout(() => setCopyButtonText("copiar"), 1000)
                        }} class="bg-orange-600 p-2 rounded-md text-white">{copyButtonText}</button>
                    </div>
                }
            </div>
        </div>
    )
}