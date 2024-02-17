
interface Props {
    onClose: () => void
}

export default function CreateLinkModal({onClose}: Props) {


    return (
        <div class="absolute z-40 top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center">
            <div class="w-full max-w-[400px] h-fit min-h-[200px] bg-white rounded-md border grid place-content-center">
                <button onClick={onClose}>x</button>
                hola
            </div>
        </div>
    )
}