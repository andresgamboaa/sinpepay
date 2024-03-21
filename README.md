# sinpepay
Herramienta para facilitar transacciones de SINPE Móvil (Costa Rica) vía SMS.

## Características
* Permite crear enlaces de pago para agregar en páginas web, redes sociales o aplicaciones de mensajería. Por ejemplo: https://sinpepay.net/pago/?data=%5B500%2C12345678%2C%22pago%22%5D

* Permite realizar transferencias SINPE Móvil escaneando códigos QR.
* En smartphones el botón de pago abre la aplicación de mensages con un texto autocompletado, el usuario solo debe presionar el botón de enviar. Si el usuario cuenta con la aplicación esta se abre al hacer click en los enlaces de pago para una mejor experiencia.
* En computadoras se muestra un código QR para facilitar la transacción desde un smartphone.

## Crear enlaces desde un lenguage de programación
```typescript
    const cantidad: 500
    const destino: 84634758
    const detalle: "pago" // Tamano maximo de 20 sin caracteres especiales.
    const redirect: "https://www.algunapagina.com" // Opcional (Redirige al usuario cuando este realiza la transaccion)
    // * redirect no se incluye en el QR

    const encodedData = encodeURIComponent(JSON.stringify([cantidad, destino, detalle]))
    const enlace = `https://sinpepay.net/pago/?data=${encodedData}${redirect?`&redirect=${redirect}`: ""}`
```