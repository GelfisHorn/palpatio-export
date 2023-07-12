"use client"

import Link from 'next/link'
// Styles
import styles from '../Hero/Index.module.css'
// Notifications
import { toast, Toaster } from 'react-hot-toast'

export default function HeroSection() {
    
    return (
        <section className={`flex items-center ${styles.section} overflow-hidden`}>
            <div className={`flex items-center px-6 sm:px-20 2xl:px-28 ${styles.background} w-screen h-screen`}>
                <div className={"flex flex-col gap-10"}>
                    <div className={"flex flex-col gap-12 lg:w-1/2 text-center lg:text-left items-center lg:items-start"}>
                        <div className={"flex flex-col gap-4"}>
                            <h1 className={"text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] 2xl:text-[4.7rem] font-bold text-primary"}>Conexión directa entre Europa y República Dominicana</h1>
                            <p className={"text-lg 2xl:text-xl text-cyan-900"}>En Pal Patio Export, ofrecemos un servicio seguro y eficiente de envío. Nos aseguramos de que tus compras lleguen en óptimas condiciones y en el menor tiempo posible. Realiza un seguimiento en tiempo real de tu paquete y cuenta con nuestro servicio de atención al cliente para cualquier consulta. Tu satisfacción es nuestra prioridad.</p>
                        </div>
                        <Link href={"/order"} className={"w-fit px-6 lg:px-8 2xl:px-10 py-2 lg:py-3 2xl:py-4 text-lg 2xl:text-xl font-medium bg-primary hover:bg-cyan-800 transition-colors text-white rounded-full"}>Cotizar envío</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}