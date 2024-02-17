
interface Props {
    redirect: string
}

export default function ContinueButton({redirect}: Props) {
    const url = new URL(redirect)
    return (
        <div id="pay-button-container" class="flex flex-col justify-center items-center gap-2 mt-6">
            <p class="text-center">Escanea el código con tu teléfono, realiza la transferencia y presiona continuar.</p>
            <a 
                href={redirect}
                onClick={(e) => {
                    e.preventDefault()
                    window.location.replace(redirect)
                }}
                id="pay-button" class="bg-orange-700 text-center transition-all hover:bg-orange-600 p-2 px-12 text-white rounded-md font-bold text-2xl cursor-pointer mt-2">
                    Continuar en {url.hostname}
                </a>
        </div>
    )
}

