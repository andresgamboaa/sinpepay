import SelectBank from "./SelectBank"

interface Props {
    onCreateLinkClick?: () => void
    onBankChanged?: (n:number) => void
}

export default function Navbar({onCreateLinkClick, onBankChanged}: Props) {

    return (
        <div class="w-full h-fit flex flex-col gap-4 md:flex-row items-center justify-center md:justify-normal p-4 mx-auto max-w-[1200px]">
            <a href="/" class=" text-2xl font-bold"><span class="text-black">sinpe</span><span class=" text-orange-600">pay</span></a>
            <div class="w-full flex text-black justify-center ">
                <button class="mr-10">Docs</button>
                <button onClick={onCreateLinkClick}>Crear link</button>
            </div>
            <SelectBank 
                onBankChanged={onBankChanged}
            />
        </div>
    )
}