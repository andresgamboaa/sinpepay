import { useState } from "preact/hooks"
import CreateLinkModal from "./CreateLinkModal"
import SelectBank from "./SelectBank"

interface Props {
    onBankChanged?: (n:number) => void
}

export default function Navbar({onBankChanged}: Props) {
    const [showCreateLinkModal, setShowCreateLinkModal] = useState(false)

    return (
        <div class="w-full h-fit flex flex-col gap-4 md:flex-row items-center justify-center md:justify-normal p-4 mx-auto max-w-[1200px]">
            <a href="/" class=" text-2xl font-bold"><span class="text-black">sinpe</span><span class=" text-orange-600">pay</span></a>
            <div class="w-full flex text-black justify-center ">
                <button onClick={() => setShowCreateLinkModal(true)}>Crear enlace</button>
            </div>
            <SelectBank 
                onBankChanged={onBankChanged}
            />
            {showCreateLinkModal && <CreateLinkModal onClose={() => setShowCreateLinkModal(false)}/>}
        </div>
    )
}