import { useEffect, useState } from "preact/hooks";
import PayDetails from "./PayDetails";
import PayButton from "./PayButton";
import QRCodeView from "./QRCode";
import CreateLinkModal from "./CreateLinkModal";
import ContinueButton from "./ContinueButton";
import Navbar from "./NavBar";

export interface Data {
    amount: number,
    receiver: number,
    detail: string,
}

export default function Content() {
    const [data, setData] = useState<Data | undefined>()
    const [isOnMobile, setIsOnMobile] = useState(false)
    const [isInvalidLink, setIsInvalidLink] = useState(false)
    const [bankNumber, setBankNumber] = useState<number>(2627)
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
    const [redirect, setRedirect] = useState<string | null>(null)

    useEffect(() => {
        setIsOnMobile(isMobileDivice())
        const savedBankNumber = localStorage.getItem("bankNumber")

        if (savedBankNumber) {
            setBankNumber(parseInt(savedBankNumber))
        }

        let rawData 

        try {
            const params = getParams() 
            rawData = params?.data
            setRedirect(params?.redirect?? null)
        }
        catch(e) {
            console.error(e)
            setIsInvalidLink(true)
        }

        if (rawData) {
            const formatedData = formatData(rawData)
            console.log(formatedData)
            if (!formatedData) {
                setIsInvalidLink(true)
                return
            }
            setData(formatedData)
        }

        //console.log(encodeURI(JSON.stringify([1000, 64324820, "Un cafe"])))
    }, [])

    return (
        <div class="flex-1 w-full flex flex-col">
            <Navbar 
                onBankChanged={setBankNumber}
            />

            <main class="flex-1 flex flex-col gap-2 justify-center items-center">

                {isInvalidLink && 
                    <div class="h-full grid place-content-center">
                        <p>Este link es incorrecto.</p>
                    </div>
                }

                {data && 
                    <div class="h-full grid place-content-center">
                        <div class="flex flex-col justify-center items-center md:flex-row">
                            <div class="h-fit w-full flex flex-col gap-4 justify-center items-center p-4">
                                <PayDetails data={data}/>
                                {isOnMobile && <PayButton number={bankNumber} data={data}/>}
                            </div>
                            {!isOnMobile && <QRCodeView data={data} />}
                        </div>
                        {!isOnMobile && <p class="text-center mt-6 opacity-70">Escanee el código con su teléfono móvil y realiza la transferencia.</p>}
                        {!isOnMobile && redirect && <ContinueButton redirect={redirect}/>}
                    </div>
                }

                { isCreateLinkModalOpen && <CreateLinkModal onClose={() => setIsCreateLinkModalOpen(false)}/> }
            </main>
        </div>
    )
}

function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let data = urlParams.get('data')
    let redirect = urlParams.get('redirect')
    if (redirect) {
        redirect = decodeURIComponent(redirect)
    }
    if (data) {
        console.log(decodeURIComponent(data))
        return {data:JSON.parse(decodeURIComponent(data)), redirect}
    }
    return null
}

function formatData(data:any) {
    if (!Array.isArray(data)) return null

    const amount = data.at(0)
    const receiver = data.at(1)
    const detail = data.at(2)
    //const redirect = data.at(3)

    // Validacion
    const detalleRegex = /^[a-zA-Z0-9 ]{1,19}$/;

    if (!Number.isInteger(amount)) {
        return null
    }
    if (!Number.isInteger(receiver)) {
        return null
    }
    if (detail && !detalleRegex.test(detail)) {
        return null
    }
    //if (redirect !== undefined && !isUrl(redirect)) return null

    return { amount, receiver, detail }
}

function isMobileDivice() {
    let regexp = /android|iphone/i; 
    return regexp.test(navigator.userAgent); 
}
