import { createRef } from "preact";
import type { Data } from "./Content";
import { useEffect } from "preact/hooks";

declare global {
  interface Window {
    QRCode: any;
  }
}

interface Props {
  data: Data,
}

export default function QRCodeView({data}:Props) {
  const ref = createRef();
  //const stringData = JSON.stringify([data.amount, data.receiver, data.detail])
  const stringData = encodeURIComponent(JSON.stringify([data.amount, data.receiver, data.detail]))

  const baseUrl = "https://sinpepay.net"
  useEffect(() => {
    new window.QRCode(ref.current, {
      text:  `${baseUrl}/pago/?data=${stringData}`,
      width: 500,
      height: 500,
      colorDark : "#c2410c",
      colorLight : "#ffffff",
      correctLevel : window.QRCode.CorrectLevel.H
    });
  }, [data])

  return (
    <div class="max-w-[200px] mx-auto md:max-w-fit" ref={ref}></div>
  )
}