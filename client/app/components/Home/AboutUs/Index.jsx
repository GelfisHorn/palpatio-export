"use client"

// Styles
import styles from './Index.module.css'

export default function AboutUs() {

    const handleScrollToElement = () => {
        var element = document.querySelector("#contact");

        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    return (
        <div className={`${styles.container} h-fit py-24 md:py-32`}>
            <div className={"flex flex-col items-center gap-10 w-full lg:w-2/3 px-6 lg:px-0 mx-auto text-center text-white"}>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-2xl lg:text-4xl uppercase font-bold"}>Acerca de nosotros</h2>
                    <p className={"text-sm sm:text-base lg:text-lg text-zinc-200"}>En Pal Patio Export, somos una empresa especializada en la exportación de una amplia variedad de productos, incluyendo paquetes, pallets, tanques, autos y más. Nuestro objetivo es brindar soluciones de exportación eficientes y confiables, adaptadas a las necesidades específicas de nuestros clientes. Trabajamos en estrecha colaboración con proveedores de confianza y socios logísticos para asegurar la calidad y seguridad de todos los productos que exportamos. Ya sea que necesite enviar paquetes pequeños, pallets de carga, tanques industriales o incluso vehículos, nos encargaremos de todos los aspectos del proceso de exportación.</p>
                </div>
                <button onClick={handleScrollToElement} className={"text-sm sm:text-base border-2 border-zinc-200 text-zinc-200 hover:text-white hover:border-primary hover:bg-primary transition-colors w-fit py-2 px-6 rounded-md font-semibold uppercase"}>Contactanos</button>            
            </div>
        </div>
    )
}